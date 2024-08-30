import { GoogleGenerativeAI } from "@google/generative-ai";
import config from '../../.env';

const apiKey = config.apiKey;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

export default async (req, res) => {
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
