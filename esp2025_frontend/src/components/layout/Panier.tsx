import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  mockProducts,
  mockSizes,
  type Product,
  type Size,
} from "../../mocks/mock";
// @ts-ignore
import shrekImage from "../../assets/testshrek.png";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

// Dans le futur, utiliser le local storage pour stocker le panier
interface CartItem {
  productId: number;
  quantity: number;
  sizeId: number;
}

const Panier: React.FC = () => {
  const navigate = useNavigate();

  // État initial avec deux produits
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: 1, quantity: 1, sizeId: 3 }, // Blouson 3-1 Multi-fonctions Blauer Taille M
    { productId: 3, quantity: 1, sizeId: 4 }, // Manteau d'entraînement Taille L
  ]);

  // Récupérer les informations des produits depuis mock
  const cartProductDetails = cartItems.map((item) => {
    const product = mockProducts.find(
      (p: Product) => p.idProduct === item.productId
    );
    const size = mockSizes.find((s: Size) => s.idSize === item.sizeId);
    return { ...item, product, size };
  });

  // Calculer le total des points
  const totalPoints = cartProductDetails.reduce(
    (total, item) =>
      total + (item.product ? item.product.points * item.quantity : 0),
    0
  );

  // Gérer la quantité
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Supprimer un élément du panier
  const removeItem = (productId: number) => {
    setCartItems((items) =>
      items.filter((item) => item.productId !== productId)
    );
  };

  // Retourner au catalogue
  const handleBack = () => {
    navigate("/catalogue");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* En-tête avec bouton retour */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Revenir en arrière
          </button>
        </div>

        {/* Contenu du panier */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Votre panier</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12 border rounded">
              <p className="text-xl font-semibold">Votre panier est vide !</p>
            </div>
          ) : (
            <>
              {/* Liste des articles */}
              <div className="divide-y">
                {cartProductDetails.map((item) => {
                  if (!item.product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="py-4 flex items-center"
                    >
                      {/* Image du produit */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden mr-4">
                        <img
                          src={item.product.imageURL || shrekImage}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Informations du produit */}
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Taille: {item.size?.status}
                        </p>
                      </div>

                      {/* Contrôle de quantité */}
                      <div className="flex items-center border rounded mx-4">
                        <button
                          className="px-3 py-1 border-r"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="px-3 py-1 border-l"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* Points */}
                      <div className="text-right w-24 font-semibold">
                        {item.product.points * item.quantity} points
                      </div>

                      {/* Supprimer */}
                      <button
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.productId)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Total et bouton commander */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold">
                    {totalPoints} points
                  </span>
                </div>
                <button className="w-full bg-gray-800 hover:bg-red-800 text-white py-3 rounded-lg">
                  Passer la commande
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panier;
