import React, { useState } from "react";
import { mockUsers, type User } from "../../mocks/mock";
import AddPointAdminModal from "../modals/AddPointAdminModal";
import CalculatePointAdminModal from "../modals/CalculatePointAdminModal";

const AdminPoint: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddPointModal, setShowAddPointModal] = useState(false);
  const [showCalculatePointModal, setShowCalculatePointModal] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(selectedUser?.idUser === user.idUser ? null : user);
  };

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* En-tête du tableau */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Gestion des points</h2>
        </div>

        {/* Tableau des utilisateurs et leurs points */}
        <div className="flex">
          <div className="w-2/3">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Nom et Prénom</th>
                  <th className="px-6 py-3 text-left">Nombre de points</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user: User) => (
                  <tr
                    key={user.idUser}
                    className={`border-b hover:bg-gray-50 cursor-pointer ${
                      selectedUser?.idUser === user.idUser ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <td className="px-6 py-4">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4">{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Panneau latéral avec les actions */}
          <div className="w-1/3 p-6 space-y-6 border-l">
            <button
              className={`w-full py-3 px-4 rounded text-white ${
                selectedUser
                  ? "bg-gray-800 hover:bg-red-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedUser}
              onClick={() => selectedUser && setShowAddPointModal(true)}
            >
              Ajouter des points
            </button>

            <button
              className="w-full py-3 px-4 border rounded hover:bg-gray-100"
              onClick={() => setShowCalculatePointModal(true)}
            >
              Calculer nombre points / heure
            </button>
          </div>
        </div>
      </div>

      {/* Afficher le modal seulement si un utilisateur est sélectionné ET showAddPointModal est true */}
      {selectedUser && showAddPointModal && (
        <AddPointAdminModal
          onClose={() => setShowAddPointModal(false)}
          onSubmit={() => {}}
          user={selectedUser}
        />
      )}

      {selectedUser && showCalculatePointModal && (
        <CalculatePointAdminModal
          onClose={() => setShowCalculatePointModal(false)}
          onSubmit={(points: number) => {}}
        />
      )}
    </div>
  );
};

export default AdminPoint;
