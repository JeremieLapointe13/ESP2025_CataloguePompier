import React from "react";
import { mockGrades, type User } from "../../mocks/mock";

interface ModifyUserAdminModalProps {
  onClose: () => void;
  onSubmit: () => void;
  user: User;
}

const ModifyUserAdminModal: React.FC<ModifyUserAdminModalProps> = ({
  onClose,
  onSubmit,
  user,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modifier un utilisateur</h2>
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
            defaultValue={user.firstName}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Nom"
            defaultValue={user.lastName}
            className="w-full p-2 border rounded"
          />
          <select
            className="w-full p-2 border rounded"
            defaultValue={user.gradeId}
          >
            {mockGrades.map((grade) => (
              <option key={grade.idGrade} value={grade.idGrade}>
                {grade.nomGrade}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email"
            defaultValue={user.email}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Ville"
            defaultValue={user.ville}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Province"
            defaultValue={user.province}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Pays"
            defaultValue={user.pays}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="No. Matricule"
            defaultValue={user.noMatricule}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Mot de passe"
            defaultValue={user.password}
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={user.isAdmin}
              />
              Administrateur
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={user.isActive}
              />
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
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyUserAdminModal;
