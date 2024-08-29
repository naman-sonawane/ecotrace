import { useState } from 'react';

interface TransportRowProps {
  setTransportation: React.Dispatch<React.SetStateAction<string>>;
  setDailyTravel: React.Dispatch<React.SetStateAction<number>>;
}

export default function TransportRow({ setTransportation, setDailyTravel }: TransportRowProps) {
  const [transportation, localSetTransportation] = useState('');
  const [dailyTravel, localSetDailyTravel] = useState(0);

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Transportation</h2>
      <select
        value={transportation}
        onChange={(e) => {
          localSetTransportation(e.target.value);
          setTransportation(e.target.value);
        }}
        className="block w-full bg-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
      >
        <option value="">Select</option>
        <option value="Car">Car</option>
        <option value="Public Transport">Public Transport</option>
        <option value="Bicycle">Bicycle</option>
        <option value="Walking">Walking</option>
      </select>
      <label className="text-gray-700 text-sm font-bold mb-2">Daily Travel (km)</label>
      <input
        type="range"
        min="0"
        max="100"
        value={dailyTravel}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          localSetDailyTravel(value);
          setDailyTravel(value);
        }}
        className="w-full"
      />
      <span className="text-gray-600">{dailyTravel} km</span>
    </div>
  );
}
