// components/TransportRow.tsx
import { useState } from 'react';

export default function TransportRow() {
  const [transportation, setTransportation] = useState('');
  const [dailyTravel, setDailyTravel] = useState(0);

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Transportation</h2>
      <select
        value={transportation}
        onChange={(e) => setTransportation(e.target.value)}
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
        onChange={(e) => setDailyTravel(Number(e.target.value))}
        className="w-full"
      />
      <p className="text-gray-600">Travel: {dailyTravel} km</p>
    </div>
  );
}
