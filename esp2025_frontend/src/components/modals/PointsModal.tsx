import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
// @ts-ignore
import { getPoints } from "../../services/auth";

interface PointsProps {
  onClose: () => void;
}

const Points: React.FC<PointsProps> = ({ onClose }) => {
  // Déplacez votre useState à l'intérieur du composant
  const [userPoints, setUserPoints] = useState<number>(0);

  // Déplacez votre useEffect à l'intérieur du composant
  useEffect(() => {
    setUserPoints(getPoints());
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-xl w-72">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Mes points</h3>
          <FaTimes className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="text-center py-4">
          {/* Utilisez userPoints au lieu d'appeler directement getPoints() */}
          <div className="text-3xl font-bold text-gray-800">{userPoints}</div>
          <p className="text-sm text-gray-600 mt-1">points accumulés</p>
        </div>
      </div>
    </div>
  );
};

export default Points;
