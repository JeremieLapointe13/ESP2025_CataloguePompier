import React, { useState, useEffect } from "react";

interface CalculatePointAdminModalProps {
  onClose: () => void;
  onSubmit: (points: number) => void;
}

const CalculatePointAdminModal: React.FC<CalculatePointAdminModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [hours, setHours] = useState<number>(0);
  const [calculatedPoints, setCalculatedPoints] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Taux de conversion: 1 heure = 0.5 point
  const CONVERSION_RATE = 0.5;

  const calculatePoints = () => {
    const points = hours * CONVERSION_RATE;
    setCalculatedPoints(points);
    setHasCalculated(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Calculer des points</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-8">
          <p className="text-center mb-2">
            Entrer le nombre d'heure à calculer :
          </p>

          <input
            type="text"
            value={hours}
            onChange={(e) => {
              setHours(parseFloat(e.target.value) || 0);
              setHasCalculated(false);
            }}
            className="w-full p-2 border rounded mb-6"
          />

          <div className="flex justify-center mb-6">
            <button
              onClick={calculatePoints}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-red-800"
            >
              Calculer
            </button>
          </div>

          {hasCalculated && (
            <p className="text-center font-medium">
              Vous devez ajouter{" "}
              <span className="font-bold">{calculatedPoints}</span> point
              {calculatedPoints !== 1 ? "s" : ""} à l'employé
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatePointAdminModal;
