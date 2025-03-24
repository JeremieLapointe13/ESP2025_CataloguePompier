import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  mockCategories,
  mockProducts,
  type Category,
  type Product,
} from "../../mocks/mock";
// @ts-ignore
import shrekImage from "../../assets/testshrek.png";

const Catalogue: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(mockCategories);
    setProducts(mockProducts);
  }, []);

  // Fonction pour afficher une catégorie et ses sous-catégories de façon récursive
  function renderCategory(category: Category, depth: number = 0) {
    return (
      <div
        key={category.idCategory}
        className={`mb-1 ${depth > 0 ? "ml-4" : ""}`}
      >
        {/* Catégorie avec bouton radio */}
        <div className="flex items-center">
          <input
            type="radio"
            id={`cat-${category.idCategory}`}
            name="category"
            value={category.idCategory}
            className="mr-2"
          />
          <label htmlFor={`cat-${category.idCategory}`}>{category.name}</label>
        </div>

        {/* Sous-catégories (appel récursif) */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="ml-2">
            {category.subcategories.map((subcat) =>
              renderCategory(subcat, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  }

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Rendu principal du composant
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Panneau des catégories */}
      <div className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-lg font-bold mb-4">Catégories</h2>
        <div className="space-y-2">
          {/* Rendu de toutes les catégories principales */}
          {categories.map((category) => renderCategory(category))}
        </div>
      </div>

      {/* Zone d'affichage des produits */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Catalogue Caserne RDL 2025
        </h1>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.idProduct}
              className="bg-white rounded shadow p-4 cursor-pointer flex flex-col h-full"
              onClick={() => handleProductClick(product.idProduct)}
            >
              {/* Image et badge de points */}
              <div className="relative h-48 mb-3">
                <img
                  src={product.imageURL || shrekImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  {product.points} points
                </div>
              </div>

              {/* Informations du produit */}
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-grow">
                {product.description}
              </p>

              {/* Button pour ajouter au panier*/}
              <button className="w-full bg-gray-800  hover:bg-red-800 text-white py-2 rounded mt-auto">
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
