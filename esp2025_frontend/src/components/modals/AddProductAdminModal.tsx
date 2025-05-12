import React, { useState, useEffect } from "react";
import {
  createProduct,
  Product,
  CreateProductDto,
} from "../../services/adminProducts";
import {
  getAllSizes,
  Size,
  getAllFabricTypes,
  FabricType,
  getAllCategories,
  Category,
} from "../../services/referenceData";

interface AddProductAdminModalProps {
  onClose: () => void;
  onSubmit: (product: Product) => void;
}

const AddProductAdminModal: React.FC<AddProductAdminModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CreateProductDto>({
    name: "",
    points: 0,
    categoryId: 0,
    sizeId: 0,
    fabricTypeId: null,
    productNo: "",
    description: "",
    imageURL: "",
    supplierId: 1,
    quantity: 0,
    isActive: true,
  });

  const [error, setError] = useState<string>("");
  const [sizes, setSizes] = useState<Size[]>([]);
  const [fabricTypes, setFabricTypes] = useState<FabricType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Le nom du produit est requis.";
    if (formData.name.length > 100)
      return "Le nom du produit ne doit pas dépasser 100 caractères.";

    if (!formData.productNo.trim()) return "Le numéro de produit est requis.";
    if (formData.productNo.length > 50)
      return "Le numéro de produit ne doit pas dépasser 50 caractères.";

    if (formData.points < 0)
      return "Les points doivent être un nombre positif ou nul.";

    if (!formData.categoryId || formData.categoryId <= 0)
      return "La catégorie est requise.";

    if (!formData.sizeId || formData.sizeId <= 0)
      return "La taille est requise.";

    if (formData.fabricTypeId !== null && formData.fabricTypeId <= 0)
      return "Le type de tissu est invalide.";

    if (formData.description && formData.description.length > 1000)
      return "La description ne doit pas dépasser 1000 caractères.";

    if (formData.imageURL && formData.imageURL.length > 500)
      return "L'URL de l'image ne doit pas dépasser 500 caractères.";

    if (formData.quantity < 0)
      return "La quantité doit être un nombre positif ou nul.";

    return null; // Tout est valide
  };

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const sizesData = await getAllSizes();
        setSizes(sizesData);
      } catch (err) {
        console.error("Erreur lors du chargement des tailles:", err);
        setError("Impossible de charger les tailles");
      }
    };

    const fetchFabricTypes = async () => {
      try {
        const fabricTypesData = await getAllFabricTypes();
        setFabricTypes(fabricTypesData);
      } catch (err) {
        console.error("Erreur lors du chargement des types de tissu:", err);
        setError("Impossible de charger les types de tissu");
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories:", err);
        setError("Impossible de charger les catégories");
      }
    };

    fetchSizes();
    fetchFabricTypes();
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else if (name === "fabricTypeId" && value === "") {
      setFormData({
        ...formData,
        fabricTypeId: null,
      });
    } else {
      setFormData({
        ...formData,
        [name]:
          type === "number" ||
          name === "points" ||
          name === "categoryId" ||
          name === "sizeId" ||
          name === "quantity"
            ? parseInt(value) || 0
            : value,
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
      const newProduct = await createProduct(formData);
      onSubmit(newProduct);
      onClose();
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(err.message || "Erreur lors de l'ajout du produit");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Ajouter un produit</h2>
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
            name="name"
            placeholder="Nom du produit"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="points"
            placeholder="Points"
            className="w-full p-2 border rounded"
            value={formData.points}
            onChange={handleChange}
            required
          />

          <select
            name="categoryId"
            className="w-full p-2 border rounded"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.idCategory} value={cat.idCategory}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            name="sizeId"
            className="w-full p-2 border rounded"
            value={formData.sizeId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une taille</option>
            {sizes.map((size) => (
              <option key={size.idSize} value={size.idSize}>
                {size.status}
              </option>
            ))}
          </select>

          <select
            name="fabricTypeId"
            className="w-full p-2 border rounded"
            value={formData.fabricTypeId || ""}
            onChange={handleChange}
          >
            <option value="">Sélectionner un type de tissu</option>
            {fabricTypes.map((fabricType) => (
              <option
                key={fabricType.idFabricType}
                value={fabricType.idFabricType}
              >
                {fabricType.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="productNo"
            placeholder="Numéro de produit"
            className="w-full p-2 border rounded"
            value={formData.productNo}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded h-24"
            value={formData.description || ""}
            onChange={handleChange}
          ></textarea>

          <input
            type="text"
            name="imageURL"
            placeholder="URL de l'image (optionnel)"
            className="w-full p-2 border rounded"
            value={formData.imageURL || ""}
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantité"
            className="w-full p-2 border rounded"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <div className="flex items-center">
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

export default AddProductAdminModal;
