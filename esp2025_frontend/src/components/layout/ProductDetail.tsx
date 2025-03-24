import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  mockProducts,
  mockSizes,
  type Product,
  type Size,
} from "../../mocks/mock";
// @ts-ignore
import shrekImage from "../../assets/testshrek.png";
import { FaArrowLeft } from "react-icons/fa";
import AddToCartModal from "../modals/AddToCartModal";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>(mockProducts[0]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [addToCartModalOpen, setAddToCartModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const foundProduct =
      mockProducts.find(
        (p: Product) => p.idProduct === parseInt(productId || "0")
      ) || mockProducts[0];

    setProduct(foundProduct);

    const size = mockSizes.find((s: Size) => s.idSize === foundProduct.sizeId);
    if (size) setSelectedSize(size.status);
  }, [productId]);

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
              src={product.imageURL || shrekImage}
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
            <p className="text-gray-600 mb-4">{product.supplier}</p>

            {/* Numéro de produit */}
            {product.productNo && (
              <div className="mb-4">
                <span className="text-sm text-gray-500">Référence: </span>
                <span className="font-medium">{product.productNo}</span>
              </div>
            )}

            {/* Sélecteur de taille */}
            <div className="mb-4">
              <label
                htmlFor="size-select"
                className="block text-sm text-gray-500 mb-1"
              >
                Grandeur
              </label>
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {mockSizes.map((size: Size) => (
                  <option key={size.idSize} value={size.status}>
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
              onClick={() => setAddToCartModalOpen(true)}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
      {addToCartModalOpen && (
        <AddToCartModal onClose={() => setAddToCartModalOpen(false)} />
      )}
    </div>
  );
};

export default ProductDetail;
