import { RecomCards } from '@/components/recomCards';
import Head from 'next/head';
import { useState } from 'react';
import DietRow from '@/components/dietRow';
import TransportRow from '@/components/transportRow';
import EnergyUsageRow from '@/components/energyUsageRow';
import axios from 'axios';

export default function Trace() {
  const [meals, setMeals] = useState<{ id: number; details: string }[]>([]);
  const [transportation, setTransportation] = useState('');
  const [dailyTravel, setDailyTravel] = useState(0);
  const [energyUsage, setEnergyUsage] = useState('');
  const [insulation, setInsulation] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true); // Show loading state
    try {
      const response = await axios.post('http://localhost:5000/calculate', {
        meals,
        transportation,
        dailyTravel,
        energyUsage,
        insulation
      });
      const footprint = response.data.carbonFootprint;
      setCarbonFootprint(footprint);
      // Save the carbon footprint to local storage
      localStorage.setItem('carbonFootprint', footprint.toString());
    } catch (error) {
      console.error('Error calculating carbon footprint', error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const dailyFootprint = carbonFootprint ?? 0;
  const monthlyFootprint = dailyFootprint * 30;
  const yearlyFootprint = dailyFootprint * 365;

  return (
    <>
      <Head>
        <title>EcoTrace 🌱 Trace</title>
      </Head>
      <main className="bg-gradient-to-b from-[#C3E798] to-[#83E70C] w-screen flex flex-col items-center pt-4 min-h-screen relative">
        <div className="w-full max-w-screen flex flex-col items-center space-y-8">
          <div className="w-full max-w-6xl space-y-8">
            {!loading && carbonFootprint === null && (
              <>
                <DietRow meals={meals} setMeals={setMeals} />
                <TransportRow setTransportation={setTransportation} setDailyTravel={setDailyTravel} />
                <EnergyUsageRow setEnergyUsage={setEnergyUsage} setInsulation={setInsulation} />
              </>
            )}
            <div className="p-8">
              {!carbonFootprint && !loading && (
                <button
                  onClick={handleCalculate}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Calculate
                  </span>
                </button>
              )}
              {loading && (
                <div className="flex justify-center items-center mt-8">
                  <img src="https://loading.io/assets/mod/spinner/ripple/index.svg" alt="Loading..." />
                </div>
              )}
              {!loading && carbonFootprint !== null && (
                <>
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                      <h2 className="text-2xl font-semibold mb-4 w-full">Carbon Footprint</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-100 p-4 rounded-lg shadow-md">
                          <h3 className="text-xl font-semibold">Daily</h3>
                          <p className="text-2xl">{dailyFootprint.toFixed(0)} kg CO₂</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                          <h3 className="text-xl font-semibold">Monthly</h3>
                          <p className="text-2xl">{monthlyFootprint.toFixed(0)} kg CO₂</p>
                        </div>
                        <div className="bg-red-100 p-4 rounded-lg shadow-md">
                          <h3 className="text-xl font-semibold">Yearly</h3>
                          <p className="text-2xl">{yearlyFootprint.toFixed(0)} kg CO₂</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-8">
                    <button className="bg-gray-200 p-4 rounded-lg shadow-md text-lg text-gray-700">
                      Placeholder for Future Button
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {!loading && carbonFootprint !== null && (<><RecomCards /></>)}
      </main>
    </>
  );
}
