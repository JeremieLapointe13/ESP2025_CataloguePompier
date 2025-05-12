// src/components/layout/Commande.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getUserOrders, OrderDto } from "../../services/orderService";
import { getProductById } from "../../services/adminProducts";
// @ts-ignore
import notFoundImageImage from "../../assets/notFound.png";

const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const CommandeDetails: React.FC<{ order: OrderDto }> = ({ order }) => {
  const [productImages, setProductImages] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    const loadProductImages = async () => {
      const images: { [key: number]: string } = {};

      if (!order.orderItems || order.orderItems.length === 0) {
        return;
      }

      for (const item of order.orderItems.slice(0, 5)) {
        try {
          const product = await getProductById(item.productId);
          images[item.productId] = product.imageURL || notFoundImageImage;
        } catch (error) {
          images[item.productId] = notFoundImageImage;
        }
      }

      setProductImages(images);
    };

    loadProductImages();
  }, [order.orderItems]);

  const isDelivered = order.status === "delivered";
  const statusLabel = isDelivered
    ? `Livré le ${formatDate(order.actualDeliveryDate || "")}`
    : `Livraison prévue pour le ${formatDate(order.expectedDeliveryDate)}`;

  const displayItems = order.orderItems ? order.orderItems.slice(0, 5) : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-3 mb-4 pb-4 border-b">
        <div>
          <p className="text-sm font-semibold">Commande effectué le</p>
          <p className="text-sm">{formatDate(order.orderDate)}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Total</p>
          <p className="text-sm">{order.totalPoints} points</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Expédié à</p>
          <p className="text-sm">{order.userName}</p>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">{statusLabel}</h3>

          <div className="flex space-x-2 mb-6">
            {/* Images des produits */}
            {displayItems.map((item) => (
              <div
                key={item.productId}
                className="w-16 h-16 border border-gray-300 flex items-center justify-center overflow-hidden"
              >
                {productImages[item.productId] ? (
                  <img
                    src={productImages[item.productId]}
                    alt={item.productName}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = notFoundImageImage;
                    }}
                  />
                ) : (
                  // Placeholder pendant le chargement
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform rotate-45 w-full h-[1px] bg-gray-400 absolute"></div>
                      <div className="transform -rotate-45 w-full h-[1px] bg-gray-400 absolute"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Placeholders pour compléter jusqu'à 5 */}
            {Array(Math.max(0, 5 - displayItems.length))
              .fill(0)
              .map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="w-16 h-16 border border-gray-300 flex items-center justify-center"
                >
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform rotate-45 w-full h-[1px] bg-gray-400 absolute"></div>
                      <div className="transform -rotate-45 w-full h-[1px] bg-gray-400 absolute"></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-right text-sm">Commande No {order.orderNumber}</p>
          <button
            className={`w-full px-4 py-2 border text-center ${
              isDelivered
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
            disabled={isDelivered}
          >
            Suivre votre colis
          </button>
          <button className="w-full px-4 py-2 border text-center bg-white hover:bg-gray-100">
            Détail de la commande
          </button>
        </div>
      </div>
    </div>
  );
};

const Commande: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userOrders = await getUserOrders();
        setOrders(userOrders);
        setError("");
      } catch (err: any) {
        setError(err.message || "Impossible de charger les commandes.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Chargement des commandes...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Bouton retour */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/catalogue")}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Retour au catalogue
          </button>
        </div>

        {/* Titre principal */}
        <h1 className="text-2xl font-bold mb-6">Mes commandes</h1>

        {/* Message d'erreur si besoin */}
        {error && (
          <div className="p-4 text-red-700 bg-red-100 border border-red-200 mb-4">
            {error}
          </div>
        )}

        {/* Liste des commandes */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p>Vous n'avez pas encore passé de commande.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <CommandeDetails key={index} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Commande;
