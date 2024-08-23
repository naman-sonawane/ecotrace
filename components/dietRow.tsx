import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { FaCamera } from 'react-icons/fa';

export default function DietRow() {
  const [meals, setMeals] = useState<{ id: number; name: string; details: string }[]>([]);
  const [newMealName, setNewMealName] = useState('');
  const [newMealDetails, setNewMealDetails] = useState('');
  const [nextId, setNextId] = useState(1);

  const addMeal = () => {
    if (newMealName && newMealDetails) {
      setMeals([...meals, { id: nextId, name: newMealName, details: newMealDetails }]);
      setNextId(nextId + 1);
      setNewMealName('');
      setNewMealDetails('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addMeal();
    }
  };

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4 relative">
      <h2 className="text-2xl font-bold">Diet</h2>
      {meals.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {meals.map((meal) => (
            <div key={meal.id} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-24 h-24 border-2 border-green-500 text-black rounded-full text-center text-sm p-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{`Meal ${meal.id}`}</span>
                  <span className="text-gray-600">{meal.details}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No meals for the day. Press Enter to add a new meal.</p>
      )}
      <div className="absolute top-4 right-4 flex space-x-2">
        <Tooltip title="Your today's meals will be considered to help estimate your eating habits over the span of a year." arrow>
          <button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full">
            i
          </button>
        </Tooltip>
        <IconButton
          onClick={addMeal}
          className="bg-blue-500 hover:bg-blue-700 text-white"
          aria-label="Add Meal"
        >
          <FaCamera />
        </IconButton>
      </div>
      <input
        type="text"
        placeholder="Add Meal"
        value={newMealDetails}
        onChange={(e) => setNewMealDetails(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-2 p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}
