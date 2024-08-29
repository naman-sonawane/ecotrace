import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { FaCamera } from 'react-icons/fa';
import CameraCapture from './CameraCapture';
import Popup from '@/components/ui/popup';

interface DietRowProps {
  meals: { id: number; details: string }[]; // Add meals as a prop
  setMeals: React.Dispatch<React.SetStateAction<{ id: number; details: string }[]>>;
}

export default function DietRow({ meals, setMeals }: DietRowProps) {
  const [newMealDetails, setNewMealDetails] = useState('');
  const [nextId, setNextId] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const addMeal = (details: string) => {
    if (details.trim()) {
      setMeals(prevMeals => [...prevMeals, { id: nextId, details }]);
      setNextId(prevId => prevId + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMeal(newMealDetails);
      setNewMealDetails('');
    }
  };

  const handleCapture = async (analysisResult: string) => {
    try {
      const mealDescription = analysisResult.trim();
      if (mealDescription === "X") {
        setShowErrorPopup(true);
      } else {
        addMeal(mealDescription);
      }
    } catch (error) {
      console.error('Error handling captured image result', error);
    }
  };

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-md flex flex-col space-y-4 relative">
      <h2 className="text-2xl font-bold">Diet</h2>
      <div className="flex flex-wrap gap-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.id} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-24 h-24 shadow-lg bg-lime-300 text-black rounded-full text-center text-sm p-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{`Meal ${meal.id}`}</span>
                  <span className="text-gray-600">{meal.details}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No meals for the day. Press Enter to add a new meal.</p>
        )}
      </div>
      <div className="absolute top-4 right-4 flex space-x-2">
        <Tooltip title="Your today's meals will be considered to help estimate your eating habits over the span of a year." arrow>
          <button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full">
            i
          </button>
        </Tooltip>
        <IconButton
          onClick={() => setShowCamera(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white"
          aria-label="Add Meal"
        >
          <FaCamera />
        </IconButton>
      </div>
      {showCamera && <CameraCapture onCapture={handleCapture} />}
      <input
        type="text"
        placeholder="Hit enter to manually add a meal"
        value={newMealDetails}
        onChange={(e) => setNewMealDetails(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-2 p-2 border border-gray-300 rounded-md"
      />
      {showErrorPopup && (
        <Popup
          title="Error"
          message="Sorry, that is not a food product."
          onConfirm={() => setShowErrorPopup(false)}
          onCancel={() => setShowErrorPopup(false)}
          isOpen={showErrorPopup}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
}
