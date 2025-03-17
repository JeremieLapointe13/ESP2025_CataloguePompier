import React, { useState, useEffect } from "react";
import { mockCategories, mockProducts } from "../../mocks/mocks.js";
import shrekImage from "../../assets/testshrek.png";

const Catalogue = () => {
  // États essentiels
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  // Chargement des données
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(mockProducts);
      setCategories(mockCategories);

      // Initialiser les catégories fermées
      const initialState = {};
      mockCategories.forEach((cat) => (initialState[cat.idCategory] = false));
      setExpandedCategories(initialState);

      setLoading(false);
    };
    fetchData();
  }, []);

  // Gérer l'expansion des catégories
  const toggleCategory = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setCategoryFilter("");
    setSubcategoryFilter("");
    setSearchTerm("");
  };

  // Filtrer les produits
  const filteredProducts = products.filter((product) => {
    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (categoryFilter && product.categoryId !== parseInt(categoryFilter)) {
      return false;
    }
    if (
      subcategoryFilter &&
      product.subcategoryId !== parseInt(subcategoryFilter)
    ) {
      return false;
    }
    return true;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Chargement...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Panneau des filtres */}
      <div className="w-64 bg-white p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filtres</h2>
          <button onClick={resetFilters} className="text-xs text-blue-600">
            Réinitialiser
          </button>
        </div>

        {/* Catégories et sous-catégories */}
        <div>
          <h3 className="font-semibold mb-2 border-b pb-1">Type</h3>
          <div className="ml-1 space-y-1">
            {categories.map((category) => (
              <div key={category.idCategory} className="mb-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category.idCategory}`}
                      name="category"
                      value={category.idCategory}
                      className="mr-2"
                      onChange={(e) => {
                        setCategoryFilter(e.target.value);
                        setSubcategoryFilter("");
                      }}
                      checked={
                        categoryFilter === category.idCategory.toString()
                      }
                    />
                    <label htmlFor={`category-${category.idCategory}`}>
                      {category.name}
                    </label>
                  </div>
                  {category.subcategories?.length > 0 && (
                    <button
                      onClick={() => toggleCategory(category.idCategory)}
                      className="text-xs"
                    >
                      {expandedCategories[category.idCategory] ? "▲" : "▼"}
                    </button>
                  )}
                </div>

                {/* Sous-catégories */}
                {expandedCategories[category.idCategory] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {category.subcategories.map((subcat) => (
                      <div
                        key={subcat.idCategory}
                        className="flex items-center"
                      >
                        <input
                          type="radio"
                          id={`subcategory-${subcat.idCategory}`}
                          name="subcategory"
                          value={subcat.idCategory}
                          className="mr-2"
                          onChange={(e) => {
                            setSubcategoryFilter(e.target.value);
                            if (
                              categoryFilter !== category.idCategory.toString()
                            ) {
                              setCategoryFilter(category.idCategory.toString());
                            }
                          }}
                          checked={
                            subcategoryFilter === subcat.idCategory.toString()
                          }
                        />
                        <label htmlFor={`subcategory-${subcat.idCategory}`}>
                          {subcat.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
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
            <button onClick={resetFilters} className="text-blue-600">
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogue;
