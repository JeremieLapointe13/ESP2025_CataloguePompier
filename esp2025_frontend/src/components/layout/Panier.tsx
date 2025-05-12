// src/components/layout/Panier.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
// @ts-ignore
import notFoundImageImage from "../../assets/notFound.png";
import { getProductById, Product } from "../../services/adminProducts";
import { getAllSizes, Size } from "../../services/referenceData";
import {
  getCart,
  updateCartItemQuantity,
  removeFromCart,
  CartItem,
} from "../../services/cartService";
import { createOrder } from "../../services/orderService";

// Interface pour les articles du panier avec les détails du produit
interface CartItemWithDetails {
  item: CartItem;
  product: Product | null;
  size: Size | null;
}

const Panier: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<
    CartItemWithDetails[]
  >([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Récupérer le panier du localStorage
        const cart = getCart();
        setCartItems(cart);

        // Récupérer toutes les tailles
        const sizesData = await getAllSizes();
        setSizes(sizesData);

        // Récupérer les détails des produits pour chaque article du panier
        const itemsWithDetails: CartItemWithDetails[] = [];
        let total = 0;

        for (const item of cart) {
          try {
            const product = await getProductById(item.productId);
            const size =
              sizesData.find((s) => s.idSize === item.sizeId) || null;

            itemsWithDetails.push({
              item,
              product,
              size,
            });

            if (product) {
              total += product.points * item.quantity;
            }
          } catch (productError) {
            console.error(
              `Erreur lors de la récupération du produit ${item.productId}:`,
              productError
            );
            itemsWithDetails.push({
              item,
              product: null,
              size: null,
            });
          }
        }

        setCartItemsWithDetails(itemsWithDetails);
        setTotalPoints(total);

        setError("");
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger le panier.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mettre à jour la quantité d'un article
  const handleUpdateQuantity = async (
    productId: number,
    sizeId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    updateCartItemQuantity(productId, sizeId, newQuantity);

    // Mettre à jour l'état local
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId && item.sizeId === sizeId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCartItems);

    // Mettre à jour les détails
    const updatedCartItemsWithDetails = cartItemsWithDetails.map(
      (itemWithDetails) => {
        if (
          itemWithDetails.item.productId === productId &&
          itemWithDetails.item.sizeId === sizeId
        ) {
          const updatedItem = {
            ...itemWithDetails.item,
            quantity: newQuantity,
          };
          return { ...itemWithDetails, item: updatedItem };
        }
        return itemWithDetails;
      }
    );
    setCartItemsWithDetails(updatedCartItemsWithDetails);

    // Recalculer le total
    let total = 0;
    for (const itemWithDetails of updatedCartItemsWithDetails) {
      if (itemWithDetails.product) {
        total += itemWithDetails.product.points * itemWithDetails.item.quantity;
      }
    }
    setTotalPoints(total);
  };

  // Supprimer un article du panier
  const handleRemoveItem = (productId: number, sizeId: number) => {
    removeFromCart(productId, sizeId);

    // Mettre à jour l'état local
    const updatedCartItems = cartItems.filter(
      (item) => !(item.productId === productId && item.sizeId === sizeId)
    );
    setCartItems(updatedCartItems);

    // Mettre à jour les détails
    const updatedCartItemsWithDetails = cartItemsWithDetails.filter(
      (itemWithDetails) =>
        !(
          itemWithDetails.item.productId === productId &&
          itemWithDetails.item.sizeId === sizeId
        )
    );
    setCartItemsWithDetails(updatedCartItemsWithDetails);

    // Recalculer le total
    let total = 0;
    for (const itemWithDetails of updatedCartItemsWithDetails) {
      if (itemWithDetails.product) {
        total += itemWithDetails.product.points * itemWithDetails.item.quantity;
      }
    }
    setTotalPoints(total);
  };

  // Passer la commande
  const handlePlaceOrder = async () => {
    try {
      if (cartItems.length === 0) {
        setError("Votre panier est vide.");
        return;
      }

      setProcessing(true);
      setError("");

      const order = await createOrder();

      setProcessing(false);

      // Rediriger vers la page de confirmation de commande
      navigate(`/commande`);
    } catch (err: any) {
      console.error("Erreur lors de la création de la commande:", err);
      setError(err.message || "Impossible de créer la commande.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6 flex justify-center items-center">
        <p>Chargement du panier...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* En-tête avec bouton retour */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/catalogue")}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Revenir en arrière
          </button>
        </div>

        {/* Contenu du panier */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Votre panier</h1>

          {error && (
            <div className="p-4 text-red-700 bg-red-100 border border-red-200 mb-4">
              {error}
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-12 border rounded">
              <p className="text-xl font-semibold">Votre panier est vide !</p>
            </div>
          ) : (
            <>
              {/* Liste des articles */}
              <div className="divide-y">
                {cartItemsWithDetails.map((itemWithDetails) => {
                  const { item, product, size } = itemWithDetails;

                  if (!product) {
                    return (
                      <div
                        key={`${item.productId}-${item.sizeId}`}
                        className="py-4"
                      >
                        <p className="text-red-500">
                          Produit non disponible (ID: {item.productId})
                        </p>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() =>
                            handleRemoveItem(item.productId, item.sizeId)
                          }
                        >
                          <FaTrash /> Supprimer
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`${item.productId}-${item.sizeId}`}
                      className="py-4 flex items-center"
                    >
                      {/* Image du produit */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden mr-4">
                        <img
                          src={product.imageURL || notFoundImageImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Informations du produit */}
                      <div className="flex-grow">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Taille: {size?.status || "N/A"}
                        </p>
                      </div>

                      {/* Contrôle de quantité */}
                      <div className="flex items-center border rounded mx-4">
                        <button
                          className="px-3 py-1 border-r"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.sizeId,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="px-3 py-1 border-l"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.sizeId,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* Points */}
                      <div className="text-right w-24 font-semibold">
                        {product.points * item.quantity} points
                      </div>

                      {/* Supprimer */}
                      <button
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() =>
                          handleRemoveItem(item.productId, item.sizeId)
                        }
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
                <button
                  className={`w-full py-3 rounded-lg ${
                    processing || cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-red-800"
                  } text-white`}
                  onClick={handlePlaceOrder}
                  disabled={processing || cartItems.length === 0}
                >
                  {processing ? "Traitement en cours..." : "Passer la commande"}
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
