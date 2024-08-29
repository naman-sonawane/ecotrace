import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';
import { Buffer } from 'buffer'; // Import Buffer for decoding base64 data
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './dotenv.js';
import { GoogleAIFileManager } from "@google/generative-ai/server";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const apiKey = config.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

app.post('/analyze-image', async (req, res) => {
  try {
    const { image } = req.body;

    // Ensure image data is provided
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Decode base64 data
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    const fileBuffer = Buffer.from(base64Data, 'base64');

    // Save the image to a file
    const filePath = 'uploads/temp_image.jpg';
    fs.writeFileSync(filePath, fileBuffer);

    // Upload the image to Google Generative AI
    const fileManager = new GoogleAIFileManager(apiKey);
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: 'image/jpeg',
      displayName: 'temp_image.jpg',
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: "What food item/meal is this? Respond with food name only. If it's not food, respond with X." },
    ]);

    res.json({ analysisResult: result.response.text() });

    // Clean up the uploaded file
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error analyzing image', error);
    res.status(500).send('Error analyzing image');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
