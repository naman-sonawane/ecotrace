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
      const { meals, transportation, dailyTravel, energyUsage, insulation } = req.body;

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
      if (error.response && error.response.data) {
        res.status(error.response.status).json({ error: error.response.data.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const getEmissionsForMeal = async (meal) => {
  const result = await model.generateContent(`Give me the number value in kg of carbon it takes to produce 1 serving of ${meal}. Nothing other than a number.`);
  return parseFloat(result.response.text());
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

  switch (insulation) {
    case 'Good':
      return baseEmissions * 0.8;
    case 'Average':
      return baseEmissions;
    case 'Poor':
      return baseEmissions * 1.2;
    default:
      return baseEmissions;
  }
};
