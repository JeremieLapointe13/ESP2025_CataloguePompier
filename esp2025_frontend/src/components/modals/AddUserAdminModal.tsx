import React from "react";
import { mockGrades } from "../../mocks/mock";

interface AddUserAdminModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const AddUserAdminModal: React.FC<AddUserAdminModalProps> = ({
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Ajouter un utilisateur</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            onClose();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Prénom"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Nom"
            className="w-full p-2 border rounded"
          />
          <select className="w-full p-2 border rounded">
            {mockGrades.map((grade) => (
              <option key={grade.idGrade} value={grade.idGrade}>
                {grade.nomGrade}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Ville"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Province"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Pays"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="No. Matricule"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Administrateur
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Actif
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-red-800"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserAdminModal;
