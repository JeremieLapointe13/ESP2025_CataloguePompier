export interface CartItem {
  productId: number;
  quantity: number;
  sizeId: number;
}

const CART_STORAGE_KEY = "catalog_cart";

// Récupérer le panier depuis le localStorage
export const getCart = (): CartItem[] => {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

// Sauvegarder le panier dans le localStorage
export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Ajouter un article au panier
export const addToCart = (
  productId: number,
  sizeId: number,
  quantity: number = 1
): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === productId && item.sizeId === sizeId
  );

  if (existingItemIndex >= 0) {
    // Si l'article existe déjà avec la même taille, augmenter la quantité
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Sinon, ajouter un nouvel article
    cart.push({ productId, sizeId, quantity });
  }

  saveCart(cart);
};

// Modifier la fonction de mise à jour pour prendre en compte la taille
export const updateCartItemQuantity = (
  productId: number,
  sizeId: number,
  quantity: number
): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === productId && item.sizeId === sizeId
  );

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity = quantity;
    saveCart(cart);
  }
};

// Modifier la fonction de suppression pour prendre en compte la taille
export const removeFromCart = (productId: number, sizeId: number): void => {
  const cart = getCart();
  const updatedCart = cart.filter(
    (item) => !(item.productId === productId && item.sizeId === sizeId)
  );
  saveCart(updatedCart);
};

// Vider le panier
export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};
