// src/components/modals/ModifyUserAdminModal.tsx
import React, { useState, useEffect } from "react";
import { mockGrades } from "../../mocks/mock";
import { updateUser, User, UpdateUserDto } from "../../services/adminUsers";

interface ModifyUserAdminModalProps {
  onClose: () => void;
  onSubmit: (user: User) => void;
  user: User;
}

const ModifyUserAdminModal: React.FC<ModifyUserAdminModalProps> = ({
  onClose,
  onSubmit,
  user,
}) => {
  const [formData, setFormData] = useState<User>({ ...user });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else if (name === "gradeId") {
      setFormData({
        ...formData,
        gradeId: value ? parseInt(value) : null,
      });
    } else if (
      type === "number" ||
      name === "noMatricule" ||
      name === "points"
    ) {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Utiliser la nouvelle fonction updateUser
      const updateData: UpdateUserDto = {
        idUser: formData.idUser,
        gradeId: formData.gradeId,
        email: formData.email,
        ville: formData.ville,
        province: formData.province,
        pays: formData.pays,
        noMatricule: formData.noMatricule,
        firstName: formData.firstName,
        lastName: formData.lastName,
        points: formData.points,
        isAdmin: formData.isAdmin,
        isActive: formData.isActive,
      };

      const updatedUser = await updateUser(formData.idUser, updateData);
      onSubmit({ ...formData, ...updatedUser });
      onClose();
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(
        err.message || "Erreur lors de la modification de l'utilisateur"
      );
    }
  };

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

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <select
            name="gradeId"
            className="w-full p-2 border rounded"
            value={formData.gradeId || ""}
            onChange={handleChange}
          >
            {mockGrades.map((grade) => (
              <option key={grade.idGrade} value={grade.idGrade}>
                {grade.nomGrade}
              </option>
            ))}
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="ville"
            placeholder="Ville"
            value={formData.ville}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="province"
            placeholder="Province"
            value={formData.province}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="pays"
            placeholder="Pays"
            value={formData.pays}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="noMatricule"
            placeholder="No. Matricule"
            value={formData.noMatricule}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="points"
            placeholder="Points"
            value={formData.points}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAdmin"
                className="mr-2"
                checked={formData.isAdmin}
                onChange={handleChange}
              />
              Administrateur
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                className="mr-2"
                checked={formData.isActive}
                onChange={handleChange}
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
