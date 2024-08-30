import { GoogleGenerativeAI } from "@google/generative-ai";
import config from '../../.env';

const apiKey = config.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

module.exports = async (req, res) => {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', 'https://ecotrace-lake.vercel.app'); // Set to your frontend origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [{ text: `Answer this question about carbon footprint and sustainability in 1 sentence. Use dot jots and emojis if deemed appropriate, no formatting: ${question}` }],
          },
        ]
      });

      res.json({ answer: result.response.text() });
    } catch (error) {
      console.error('Error processing question:', error);
      res.status(500).json({ error: error.message || 'Error processing question' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
