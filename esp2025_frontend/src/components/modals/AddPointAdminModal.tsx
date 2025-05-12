import React, { useState } from "react";
import { type User } from "../../mocks/mock";

interface AddPointAdminModalProps {
  onClose: () => void;
  onSubmit: () => void;
  user: User;
}

const AddPointAdminModal: React.FC<AddPointAdminModalProps> = ({
  onClose,
  onSubmit,
  user,
}) => {
  const [points, setPoints] = useState<number>(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Ajouter des points</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-8">
          <p className="text-center mb-2">
            Entrer le nombre de points à ajouter
          </p>
          <p className="text-center font-medium mb-4">
            Pour : {user.firstName} {user.lastName}
          </p>

          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded mb-6"
          />

          <div className="flex justify-center">
            <button
              onClick={() => {
                onSubmit();
                onClose();
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-red-800"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPointAdminModal;
