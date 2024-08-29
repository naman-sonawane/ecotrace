import { useState } from 'react';

interface EnergyUsageRowProps {
  setEnergyUsage: React.Dispatch<React.SetStateAction<string>>;
  setInsulation: React.Dispatch<React.SetStateAction<string>>;
}

export default function EnergyUsageRow({ setEnergyUsage, setInsulation }: EnergyUsageRowProps) {
  const [energyUsage, localSetEnergyUsage] = useState('');
  const [insulation, localSetInsulation] = useState('');

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Energy Usage</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">How much is your day dependent on electricity?</label>
        <select
          value={energyUsage}
        onChange={(e) => {
          localSetEnergyUsage(e.target.value);
          setEnergyUsage(e.target.value);
        }}
          className="block w-full bg-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
        >
          <option value="">Select</option>
          <option value="Not much">Not much</option>
          <option value="Average">Average</option>
          <option value="I need it all day">I need it all day</option>
        </select>
      </div>
      <label className="text-gray-700 text-sm font-bold mb-2">Insulation</label>
      <select
        value={insulation}
        onChange={(e) => {
          localSetInsulation(e.target.value);
          setInsulation(e.target.value);
        }}
        className="block w-full bg-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
      >
        <option value="">Select</option>
        <option value="Good">Good</option>
        <option value="Average">Average</option>
        <option value="Poor">Poor</option>
      </select>
    </div>
  );
}
