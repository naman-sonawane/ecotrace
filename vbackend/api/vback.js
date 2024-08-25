import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import config from './../dotenv.js';
import { GoogleAIFileManager } from '@google/generative-ai/server';

// Use file storage for debugging purposes
const upload = multer({ dest: 'uploads/' }); // Temporary directory

const apiKey = config.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  if (req.method === 'POST') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      try {
        if (!req.file) {
          throw new Error('No file uploaded');
        }

        const filePath = req.file.path;

        // Ensure the file exists before reading
        if (!fs.existsSync(filePath)) {
          throw new Error('File not found');
        }

        // Read the image file
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

        // Clean up the uploaded file
        fs.unlinkSync(filePath);

        res.json({ analysisResult: result.response.text() });

      } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Error analyzing image' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
