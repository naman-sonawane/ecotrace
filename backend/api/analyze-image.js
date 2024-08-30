import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { Buffer } from 'buffer';
import fs from 'fs';
import path from 'path';
import config from '../.env';

const apiKey = config.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
    try {
      const { image } = req.body;

      if (!image) {
        return res.status(400).json({ error: 'Image data is required' });
      }

      const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
      const fileBuffer = Buffer.from(base64Data, 'base64');

      const filePath = path.join('/tmp', 'temp_image.jpg');
      fs.writeFileSync(filePath, fileBuffer);

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

      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('Error analyzing image', error);
      res.status(500).send('Error analyzing image');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
