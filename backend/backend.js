import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors'; // Import CORS middleware
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './dotenv.js';
import { GoogleAIFileManager } from "@google/generative-ai/server";

const app = express();
const port = 5000;

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Add CORS middleware
app.use(cors());

const apiKey = config.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/analyze-image', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

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
      model: "gemini-1.5-pro",
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

    // Send the analysis result back to the client
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
