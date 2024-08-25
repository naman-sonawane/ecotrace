import multer from 'multer';
import fs from 'fs';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../dotenv.js';  // Adjust the path as needed
import { GoogleAIFileManager } from '@google/generative-ai/server';

const upload = multer({ dest: '/tmp/uploads/' }); // Use /tmp for serverless functions

// Setup your Google API client
const apiKey = config.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);

// Serverless function handler
export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file' });
      }

      try {
        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);

        // Upload the image to Google Generative AI
        const fileManager = new GoogleAIFileManager(apiKey);
        const uploadResponse = await fileManager.uploadFile(filePath, {
          mimeType: req.file.mimetype,
          displayName: req.file.originalname,
        });

        // Generate content using the image
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-pro',
        });

        const result = await model.generateContent([
          {
            fileData: {
              mimeType: uploadResponse.file.mimeType,
              fileUri: uploadResponse.file.uri,
            },
          },
          { text: 'What food item/meal is this? Respond with food name only. If it\'s not food, respond with X.' },
        ]);

        res.json({ analysisResult: result.response.text() });

        // Clean up the uploaded file
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error analyzing image', error);
        res.status(500).send('Error analyzing image');
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
