import Navbar from '@/components/navBar'
import Head from 'next/head';
import { FaPen } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

export default function Home() {
  const [carbonFootprint, setCarbonFootprint] = useState<number | null>(null);
  const [goal, setGoal] = useState<number>(18000);
  const [question, setQuestion] = useState<string>(''); // State for the user's question
  const [answer, setAnswer] = useState<string>(''); // State for the AI's answer

  useEffect(() => {
    // Load carbon footprint from local storage
    const storedFootprint = localStorage.getItem('carbonFootprint');
    if (storedFootprint) {
      setCarbonFootprint(Number(storedFootprint) * 365);
    }
  }, []);

  const handleEditGoal = () => {
    const newGoal = prompt('Enter your new goal (in kilograms):', goal.toString());
    if (newGoal !== null) {
      setGoal(Number(newGoal));
    }
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleAskQuestion = async () => {
    try {
      console.log('clickeddd');
      const response = await axios.post('http://localhost:5000/ask-question', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('Sorry, there was an error processing your question.');
    }
  };

  const handleReset = () => {
    setQuestion('');
    setAnswer('');
  };

  const yearlyFootprint = carbonFootprint ? carbonFootprint : 0;
  const excess = yearlyFootprint > goal ? yearlyFootprint - goal : 0;
  const percentage = excess > 0 ? (excess / goal) * 100 : 0;

  // Define the labels and colors
  const labels = [
    { range: [0, 10000], label: 'Below Average', color: 'text-green-600' },
    { range: [10001, 15000], label: 'Slightly Below Average', color: 'text-yellow-600' },
    { range: [15001, 20000], label: 'Average', color: 'text-lime-600' },
    { range: [20001, 25000], label: 'Slightly Above Average', color: 'text-orange-600' },
    { range: [25001, Infinity], label: 'Above Average', color: 'text-red-600' }
  ];

  // Determine the label and color based on the carbon footprint
  const getLabelAndColor = (footprint: number | null) => {
    if (footprint === null) return { label: 'Loading...', color: 'text-gray-600' };

    for (const { range, label, color } of labels) {
      if (footprint >= range[0] && footprint <= range[1]) {
        return { label, color };
      }
    }

    return { label: 'Unknown', color: 'text-gray-600' };
  };

  const { label, color } = getLabelAndColor(carbonFootprint);

  return (
    <>
      <Head>
        <title>EcoTrace 🌱 Dashboard</title>
      </Head>
      <main
        className="relative flex min-h-screen flex-col w-screen h-screen overflow-x-hidden p-12 pb-20"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/1423600/pexels-photo-1423600.jpeg?cs=srgb&dl=pexels-jplenio-1423600.jpg&fm=jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Navbar Placeholder */}
        <div className="fixed flex justify-center items-center top-0 w-full p-4 z-10">
      <Navbar/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg mt-20 z-10">
          {/* Top Left Card */}
          <div className="p-6 flex flex-col space-y-4">
            <h2 className="text-4xl font-bold">Welcome back.</h2>
            <p className="pl-4 text-sm text-gray-600">Track, Reduce, and Thrive with AI-Powered Carbon Insights.</p>
            {/* New Button */}
            <a href="/trace"><button
              className="bg-green-500 text-white p-2 w-1/3 scale-100 hover:scale-110 transition-all rounded-md mt-4"
            >
              See Your Impact
            </button></a>
          </div>

          {/* Top Right Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4 relative">
            <p className="text-2xl font-bold">{carbonFootprint !== null ? `${carbonFootprint} / ${goal}` : 'Loading...'}</p>
            <p className="text-sm text-gray-600">kilograms of carbon per year</p>
            <div className="relative bg-gray-200 h-4 rounded-full">
              {/* Fill color based on percentage */}
              <div
                className="bg-gradient-to-b from-[#C3E798] to-[#83E70C] h-full rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
              <span className="absolute left-0 pt-2 -translate-x-1/2 transform text-xs font-medium text-gray-700">Goal</span>
              <span className="absolute right-0 pt-2 translate-x-1/2 transform text-xs font-medium text-gray-700">Excess</span>
            </div>
            <button onClick={handleEditGoal} className="pt-4 relative flex items-center space-x-2 text-blue-600">
              <FaPen />
              <span>Edit Goal</span>
            </button>
          </div>

          {/* Bottom Left Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 pl-10 rounded-lg shadow-md flex flex-col space-y-4">
            <h2 className="text-xl text-gray-600 font-bold">Your Carbon Footprint</h2>
            <p className="text-2xl font-bold">{carbonFootprint !== null ? `${carbonFootprint}` : 'Loading...'}</p>
            <p className="text-lg text-gray-600">kilograms of carbon per year</p>
            <p className="text-sm text-gray-400">That&apos;s equivalent to driving a gasoline-powered car for about 800 miles. 🚗</p>
            <p className="text-sm font-semibold">
              Your Carbon Footprint is <span className={color}><strong>{label}</strong></span>.
            </p>
          </div>

          {/* Bottom Right Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">AI Assistant</h2>
            <p className="text-sm text-gray-600">Ask any question to learn more about reducing your carbon footprint.</p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter a question"
                  value={question}
                  onChange={handleQuestionChange}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleAskQuestion}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Send
                </button>
              </div>
              {answer && (
                <div className="p-4 border border-gray-300 rounded-md bg-white">
                  <p className="text-sm text-gray-600">AI&apos;s answer:</p>
                  <p className="text-md font-semibold">{answer}</p>
                </div>
              )}
              <button
                onClick={handleReset}
                className="bg-gray-500 text-white p-2 rounded-md mt-4"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
