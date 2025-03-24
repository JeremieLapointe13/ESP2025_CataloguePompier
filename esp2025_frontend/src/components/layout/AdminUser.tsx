import React, { useState } from "react";
import { mockUsers, mockGrades, type User, type Grade } from "../../mocks/mock";
import AddUserAdminModal from "../modals/AddUserAdminModal";
import ModifyUserAdminModal from "../modals/ModifyUserAdminModal";

const AdminUser: React.FC = () => {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [modifyUserModalOpen, setModifyUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleModify = (user: User) => {
    setSelectedUser(user);
    setModifyUserModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* En-tête du tableau */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
          <button
            className="bg-gray-800 hover:bg-red-800 text-white px-4 py-2 rounded"
            onClick={() => setAddUserModalOpen(true)}
          >
            Ajouter
          </button>
        </div>

        {/* Tableau */}
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Grade</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left"># Matricule</th>
              <th className="px-6 py-3 text-left">Actif</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user: User) => (
              <tr key={user.idUser} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4">
                  {
                    mockGrades.find((g: Grade) => g.idGrade === user.gradeId)
                      ?.nomGrade
                  }
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.noMatricule}</td>
                <td className="px-6 py-4">
                  <input type="checkbox" checked={user.isActive} readOnly />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="bg-gray-800 hover:bg-red-800 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleModify(user)}
                  >
                    Modifier
                  </button>
                  <button className="bg-red-800 hover:bg-gray-800 text-white px-3 py-1 rounded">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addUserModalOpen && (
        <AddUserAdminModal
          onClose={() => setAddUserModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
      {modifyUserModalOpen && selectedUser && (
        <ModifyUserAdminModal
          onClose={() => setModifyUserModalOpen(false)}
          onSubmit={() => {}}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default AdminUser;
