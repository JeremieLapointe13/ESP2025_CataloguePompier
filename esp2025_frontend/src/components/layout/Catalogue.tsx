import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories, Category } from "../../services/referenceData";
import { getAllProducts, Product } from "../../services/adminProducts";
// @ts-ignore
import shrekImage from "../../assets/testshrek.png";

const Catalogue: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getAllCategories(),
          getAllProducts(),
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger les données");
      }
    };

    fetchData();
  }, []);

  // Fonction pour reconstruire la hiérarchie des catégories
  const buildCategoryHierarchy = (allCategories: Category[]): Category[] => {
    // Créer une copie des catégories pour y ajouter les sous-catégories
    const categoriesWithSubcategories = allCategories.map((cat) => ({
      ...cat,
      subcategories: [] as Category[],
    }));

    // Créer un dictionnaire pour un accès rapide
    const categoryMap = new Map(
      categoriesWithSubcategories.map((cat) => [cat.idCategory, cat])
    );

    // Construire la hiérarchie
    const rootCategories: Category[] = [];

    categoriesWithSubcategories.forEach((category) => {
      if (category.parentId === null) {
        // C'est une catégorie racine
        rootCategories.push(category);
      } else {
        // C'est une sous-catégorie, l'ajouter au parent
        const parentCategory = categoryMap.get(category.parentId);
        if (parentCategory) {
          parentCategory.subcategories.push(category);
        }
      }
    });

    return rootCategories;
  };

  // Filtrer les produits par catégorie
  const getFilteredProducts = () => {
    if (!selectedCategoryId) return products;

    // Trouver toutes les sous-catégories de la catégorie sélectionnée
    const getChildCategoryIds = (categoryId: number): number[] => {
      const childIds: number[] = [categoryId];

      categories
        .filter((cat) => cat.parentId === categoryId)
        .forEach((child) => {
          childIds.push(...getChildCategoryIds(child.idCategory));
        });

      return childIds;
    };

    const categoryIds = getChildCategoryIds(selectedCategoryId);
    return products.filter((product) =>
      categoryIds.includes(product.categoryId)
    );
  };

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
            checked={selectedCategoryId === category.idCategory}
            onChange={() => setSelectedCategoryId(category.idCategory)}
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

  // Reconstruire la hiérarchie pour l'affichage
  const hierarchicalCategories = buildCategoryHierarchy(categories);
  const filteredProducts = getFilteredProducts();

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Rendu principal du composant
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-lg font-bold mb-4">Catégories</h2>
        <div className="space-y-2">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="cat-all"
              name="category"
              value=""
              className="mr-2"
              checked={selectedCategoryId === null}
              onChange={() => setSelectedCategoryId(null)}
            />
            <label htmlFor="cat-all">Toutes les catégories</label>
          </div>

          {hierarchicalCategories.map((category) => renderCategory(category))}
        </div>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Catalogue Caserne RDL 2025
        </h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500">
              Aucun produit trouvé dans cette catégorie
            </p>
          </div>
        ) : (
          /* Grille de produits */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.idProduct}
                className="bg-white rounded shadow p-4 cursor-pointer flex flex-col h-full"
                onClick={() => handleProductClick(product.idProduct)}
              >
                <div className="relative h-48 flex justify-center items-center mb-3">
                  <img
                    src={product.imageURL || shrekImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {product.points} points
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-grow">
                  {product.description}
                </p>

                <button
                  className="w-full bg-gray-800 hover:bg-red-800 text-white py-2 rounded mt-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogue;
