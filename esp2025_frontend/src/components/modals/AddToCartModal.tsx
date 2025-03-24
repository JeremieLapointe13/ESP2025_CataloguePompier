import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface AddToCartModalProps {
  onClose: () => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-xl w-96">
        <div className="flex justify-end items-center mb-2">
          <FaTimes className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex justify-center align-items-center text-center py-4">
          <FaCheck className="text-green-600 text-4xl mr-3" />
          <p className="text-sm text-gray-600">Produit ajouté au panier</p>
        </div>
        <div className="flex justify-between align-items-center text-center py-4">
          <button
            className="bg-gray-800 hover:bg-red-800 text-white py-2 px-4 rounded-lg"
            onClick={() => navigate("/catalogue")}
          >
            Continuer à magasiner
          </button>
          <button
            className="bg-gray-800 hover:bg-red-800 text-white py-2 px-4 rounded-lg"
            onClick={() => navigate("/panier")}
          >
            Voir mon panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
