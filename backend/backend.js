// backend.js

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors'; // Import CORS middleware
import axios from 'axios'; // Import axios for HTTP requests
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from './dotenv.js';
import { GoogleAIFileManager } from "@google/generative-ai/server";

const app = express();
const port = 5000;

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Add CORS middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

const apiKey = config.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);

// Generate content using the image
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

// Existing endpoint for image analysis
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

// New endpoint for calculating carbon footprint
app.post('/calculate', async (req, res) => {
  try {
    const { meals, transportation, dailyTravel, energyUsage, insulation } = req.body;

    // Placeholder logic for emission factors (replace with actual implementation)
    let totalEmissions = 0;
    for (const meal of meals) {
      const mealEmissions = await getEmissionsForMeal(meal.details);
      totalEmissions += mealEmissions;
    }
    const transportEmissions = calculateTransportEmissions(transportation, dailyTravel);
    totalEmissions += transportEmissions;
    const energyEmissions = calculateEnergyEmissions(energyUsage, insulation);
    totalEmissions += energyEmissions;

    res.json({ carbonFootprint: totalEmissions });
  } catch (error) {
    console.error('Error calculating carbon footprint:', error);
    // Send a more informative error message to the client
    if (error.response && error.response.data) {
      res.status(error.response.status).json({ error: error.response.data.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// New endpoint for handling questions
app.post('/ask-question', async (req, res) => {
  try {
    const { question } = req.body;

    // Ensure the question is provided
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Correctly format the input for the API
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: `Answer this question about carbon footprint and sustainability in 1 sentence. Use dot jots and emojis if deemed appropriate, no formatting: ${question}` }],
        },
      ]
    });

    // Send the AI's response back to the client
    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: error.message || 'Error processing question' });
  }
});


// Placeholder functions for emissions calculations
const getEmissionsForMeal = async (meal) => {
  const result = await model.generateContent(`Give me the number value in kg of carbon it takes to produce 1 serving of ${meal}. Nothing other than a number.`);
  return parseFloat(result.response.text()); // Example emission factor
};

const calculateTransportEmissions = (transportation, dailyTravel) => {
  switch (transportation) {
    case "Car":
      return dailyTravel * 0.170;
    case "Public Transport":
      return dailyTravel * 0.097;
    case "Bicycle":
      return dailyTravel * 0.021;
    case "Walking":
      return dailyTravel * 0.034;
    default:
      return 0;
  }
};

const calculateEnergyEmissions = (energyUsage, insulation) => {
  let baseEmissions = 0;

  // Adjust base emissions based on energy usage
  switch (energyUsage) {
    case 'Not much':
      baseEmissions = 20;
      break;
    case 'Average':
      baseEmissions = 27;
      break;
    case 'I need it all day':
      baseEmissions = 34;
      break;
    default:
      baseEmissions = 20;
  }

  // Adjust emissions based on insulation
  switch (insulation) {
    case 'Good':
      return baseEmissions * 0.8; // Reduced emissions
    case 'Average':
      return baseEmissions;
    case 'Poor':
      return baseEmissions * 1.2; // Increased emissions
    default:
      return baseEmissions;
  }
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
