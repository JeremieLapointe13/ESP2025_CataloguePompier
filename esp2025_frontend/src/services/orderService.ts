import { getCart, clearCart } from "./cartService";

export interface CreateOrderItemDto {
  productId: number;
  sizeId: number;
  quantity: number;
}

export interface CreateOrderDto {
  orderItems: CreateOrderItemDto[];
}

export interface OrderItemDto {
  idOrderItem: number;
  productId: number;
  sizeId: number;
  quantity: number;
  pointsAtPurchase: number;
  productName: string;
  sizeStatus: string;
}

export interface OrderDto {
  idOrder: number;
  userId: number;
  userName: string;
  orderNumber: string;
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate: string | null;
  status: string;
  totalPoints: number;
  orderItems: OrderItemDto[];
}

const API_URL = process.env.REACT_APP_API_URL;

// Créer une commande à partir du panier
export const createOrder = async (): Promise<OrderDto> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Vous devez être connecté pour passer une commande");
    }

    const cartItems = getCart();
    if (cartItems.length === 0) {
      throw new Error("Le panier est vide");
    }

    const orderData: CreateOrderDto = {
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        sizeId: item.sizeId,
        quantity: item.quantity,
      })),
    };

    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la création de la commande"
      );
    }

    const order = await response.json();

    // Vider le panier après la commande réussie
    clearCart();

    return order;
  } catch (error: any) {
    console.error("Erreur lors de la création de la commande:", error);
    throw error;
  }
};

// Récupérer les commandes de l'utilisateur
export const getUserOrders = async (): Promise<OrderDto[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Vous devez être connecté pour voir vos commandes");
    }

    const response = await fetch(`${API_URL}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la récupération des commandes"
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erreur lors de la récupération des commandes:", error);
    throw error;
  }
};

// Récupérer une commande par son ID
export const getOrderById = async (orderId: number): Promise<OrderDto> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Vous devez être connecté pour voir cette commande");
    }

    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la récupération de la commande"
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la commande:", error);
    throw error;
  }
};
