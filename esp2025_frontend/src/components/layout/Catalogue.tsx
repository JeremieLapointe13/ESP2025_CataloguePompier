import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockCategories, mockProducts } from "../../mocks/mocks.js";

// Types minimaux nécessaires
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: number; // Optionnel pour les items du panier
}

function Catalogue() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Chargement des données
  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Casque de pompier",
          description: "Casque de protection pour pompiers",
          price: 199.99,
          image: "https://example.com/casque.jpg",
          category: "Protection",
        },
        {
          id: 2,
          name: "Tuyau d'incendie",
          description: "Tuyau résistant pour l'extinction d'incendies",
          price: 149.99,
          image: "https://example.com/tuyau.jpg",
          category: "Équipement",
        },
        // Autres produits...
      ];

      setProducts(mockProducts);

      // Extraire les catégories uniques
      const uniqueCategories = Array.from(
        new Set(mockProducts.map((p) => p.category))
      );
      setCategories(uniqueCategories);

      setLoading(false);
    }, 1000);

    // Charger le panier depuis le localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Sauvegarder le panier dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategory === "all" || product.category === selectedCategory
    );

  const goToCart = () => {
    navigate("/panier");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const cartItemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Gérer l'expansion des catégories
  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Catalogue de Produits</h1>

        <button
          onClick={goToCart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span>Panier ({cartItemCount})</span>
        </button>
      </div>

      {/* Barre de filtres */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Rechercher des produits..."
            className="w-full p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="w-full md:w-1/3">
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x200?text=Image+non+disponible";
                }}
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {product.price.toFixed(2)} €
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            Aucun produit ne correspond à votre recherche.
          </p>
        </div>
      )}
    </div>
  );
}

export default Catalogue;
