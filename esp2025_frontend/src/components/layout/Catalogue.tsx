import React, { useState, useEffect } from "react";
// @ts-ignore
import { mockCategories, mockProducts } from "../../mocks/mock.ts";
// @ts-ignore
import shrekImage from "../../assets/testshrek.png";

// Interfaces simplifiées
interface Subcategory {
  idCategory: number;
  name: string;
}

interface Category {
  idCategory: number;
  name: string;
  subcategories?: Subcategory[];
}

interface Product {
  idProduct: number;
  name: string;
  description: string;
  points: number;
  categoryId: number;
  subcategoryId: number;
  imageURL?: string | null;
}

const Catalogue: React.FC = () => {
  // États essentiels uniquement
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  }, []);

  // Filtrer les produits - logique simplifiée
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Vérifier si le filtre correspond à une catégorie principale ou une sous-catégorie
    const matchesCategory =
      !categoryFilter ||
      product.categoryId === parseInt(categoryFilter) ||
      product.subcategoryId === parseInt(categoryFilter);

    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Chargement...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Panneau des filtres simplifié */}
      <div className="w-64 bg-white p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filtres</h2>
          <button
            onClick={() => {
              setCategoryFilter("");
              setSearchTerm("");
            }}
            className="text-xs text-blue-600"
          >
            Réinitialiser
          </button>
        </div>

        {/* Catégories simplifiées */}
        <div>
          <h3 className="font-semibold mb-2 border-b pb-1">Type</h3>
          <div className="ml-1 space-y-2">
            {categories.map((category) => (
              <div key={category.idCategory} className="mb-2">
                {/* Catégorie principale */}
                <div className="flex items-center font-medium">
                  <input
                    type="radio"
                    id={`category-${category.idCategory}`}
                    name="category"
                    value={category.idCategory}
                    className="mr-2"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    checked={categoryFilter === category.idCategory.toString()}
                  />
                  <label htmlFor={`category-${category.idCategory}`}>
                    {category.name}
                  </label>
                </div>

                {/* Sous-catégories */}
                <div className="ml-6 mt-1">
                  {category.subcategories?.map((subcat) => (
                    <div
                      key={subcat.idCategory}
                      className="flex items-center text-sm py-1"
                    >
                      <input
                        type="radio"
                        id={`subcat-${subcat.idCategory}`}
                        name="category"
                        value={subcat.idCategory}
                        className="mr-2"
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        checked={
                          categoryFilter === subcat.idCategory.toString()
                        }
                      />
                      <label htmlFor={`subcat-${subcat.idCategory}`}>
                        {subcat.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Catalogue Caserne RDL 2025
        </h1>

        {/* Barre de recherche */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="px-4 py-2 border rounded w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.idProduct}
              className="bg-white rounded shadow p-4"
            >
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
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {product.description}
              </p>
              <button className="w-full bg-gray-800 text-white py-2 rounded">
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            Aucun produit trouvé.{" "}
            <button
              onClick={() => {
                setCategoryFilter("");
                setSearchTerm("");
              }}
              className="text-blue-600"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogue;
