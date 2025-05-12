// src/components/layout/ProductDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, Product } from "../../services/adminProducts";
import { getAllSizes, Size } from "../../services/referenceData";
// @ts-ignore
import notFoundImageImage from "../../assets/notFound.png";
import { FaArrowLeft } from "react-icons/fa";
import AddToCartModal from "../modals/AddToCartModal";
import { addToCart } from "../../services/cartService";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSizeId, setSelectedSizeId] = useState<number>(0);
  const [addToCartModalOpen, setAddToCartModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Charger les tailles
        const sizesData = await getAllSizes();
        setSizes(sizesData);

        // Charger les détails du produit seulement si nous avons un ID valide
        if (productId) {
          const productData = await getProductById(parseInt(productId));
          setProduct(productData);

          // Définir la taille par défaut sur celle du produit
          setSelectedSizeId(productData.sizeId);
        }

        setError("");
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger les détails du produit.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    if (product && selectedSizeId) {
      // Ajouter au panier avec la taille sélectionnée
      addToCart(product.idProduct, selectedSizeId, 1);
      setAddToCartModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6 flex justify-center items-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <button
              onClick={() => navigate("/catalogue")}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FaArrowLeft className="mr-2" /> Retour au catalogue
            </button>
          </div>
          <p className="text-red-500">{error || "Produit non trouvé"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* En-tête avec bouton retour */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/catalogue")}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Retour au catalogue
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image du produit */}
          <div className="md:w-1/2 relative">
            <img
              src={product.imageURL || notFoundImageImage}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full">
              {product.points} points
            </div>
          </div>

          {/* Informations du produit */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.supplierName}</p>

            {/* Numéro de produit */}
            {product.productNo && (
              <div className="mb-4">
                <span className="text-sm text-gray-500">Référence: </span>
                <span className="font-medium">{product.productNo}</span>
              </div>
            )}

            {/* Sélecteur de taille - Modifié pour utiliser l'ID de taille */}
            <div className="mb-4">
              <label
                htmlFor="size-select"
                className="block text-sm text-gray-500 mb-1"
              >
                Grandeur
              </label>
              <select
                id="size-select"
                value={selectedSizeId}
                onChange={(e) => setSelectedSizeId(parseInt(e.target.value))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sizes.map((size) => (
                  <option key={size.idSize} value={size.idSize}>
                    {size.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="border-t border-b py-4 my-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Bouton d'ajout au panier */}
            <button
              className="w-full bg-gray-800 hover:bg-red-800 text-white py-3 rounded-lg mt-4"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>

      {/* Modal d'ajout au panier */}
      {addToCartModalOpen && (
        <AddToCartModal
          onClose={() => setAddToCartModalOpen(false)}
          productId={product.idProduct}
        />
      )}
    </div>
  );
};

export default ProductDetail;
