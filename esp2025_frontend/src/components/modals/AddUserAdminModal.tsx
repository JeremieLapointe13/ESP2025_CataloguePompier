import React, { useState, useEffect } from "react";
import { createUser, User, CreateUserDto } from "../../services/adminUsers";
import { getAllGrades, Grade } from "../../services/referenceData";

interface AddUserAdminModalProps {
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const AddUserAdminModal: React.FC<AddUserAdminModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CreateUserDto>({
    gradeId: null,
    email: "",
    ville: "",
    province: "",
    pays: "",
    noMatricule: 0,
    firstName: "",
    lastName: "",
    points: 0,
    isAdmin: false,
    isActive: true,
    password: "",
  });

  const [grades, setGrades] = useState<Grade[]>([]);
  const [error, setError] = useState<string>("");

  const validateForm = (): string | null => {
    if (!formData.firstName.trim()) return "Le prénom est requis.";
    if (formData.firstName.length > 50)
      return "Le prénom ne doit pas dépasser 50 caractères.";

    if (!formData.lastName.trim()) return "Le nom est requis.";
    if (formData.lastName.length > 50)
      return "Le nom ne doit pas dépasser 50 caractères.";

    if (!formData.email.trim()) return "L'email est requis.";
    if (formData.email.length > 100)
      return "L'email ne doit pas dépasser 100 caractères.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Format d'email invalide.";

    if (!formData.ville.trim()) return "La ville est requise.";
    if (formData.ville.length > 100)
      return "La ville ne doit pas dépasser 100 caractères.";

    if (!formData.province.trim()) return "La province est requise.";
    if (formData.province.length > 100)
      return "La province ne doit pas dépasser 100 caractères.";

    if (!formData.pays.trim()) return "Le pays est requis.";
    if (formData.pays.length > 100)
      return "Le pays ne doit pas dépasser 100 caractères.";

    if (!formData.noMatricule || formData.noMatricule <= 0)
      return "Le numéro de matricule doit être un nombre positif.";

    if (!formData.password.trim()) return "Le mot de passe est requis.";
    if (formData.password.length < 6)
      return "Le mot de passe doit contenir au moins 6 caractères."; // optionnel, mais recommandé

    return null; // Tout est bon
  };

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const gradesData = await getAllGrades();
        setGrades(gradesData);

        if (gradesData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            gradeId: gradesData[0].idGrade,
          }));
        }
      } catch (err) {
        console.error("Erreur lors du chargement des grades:", err);
        setError("Impossible de charger les grades");
      }
    };

    fetchGrades();
  }, []);

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

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const newUser = await createUser(formData);
      onSubmit(newUser);
      onClose();
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(err.message || "Erreur lors de l'ajout de l'utilisateur");
    }
  };

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
            className="w-full p-2 border rounded"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            className="w-full p-2 border rounded"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <select
            name="gradeId"
            className="w-full p-2 border rounded"
            value={formData.gradeId || ""}
            onChange={handleChange}
            required
          >
            {grades.map((grade) => (
              <option key={grade.idGrade} value={grade.idGrade}>
                {grade.nomGrade}
              </option>
            ))}
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="ville"
            placeholder="Ville"
            className="w-full p-2 border rounded"
            value={formData.ville}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="province"
            placeholder="Province"
            className="w-full p-2 border rounded"
            value={formData.province}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pays"
            placeholder="Pays"
            className="w-full p-2 border rounded"
            value={formData.pays}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="noMatricule"
            placeholder="No. Matricule"
            className="w-full p-2 border rounded"
            value={formData.noMatricule || ""}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
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
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserAdminModal;
