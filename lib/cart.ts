export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  stripePriceId?: string;
}

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const savedCart = localStorage.getItem('jessylilled-cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('jessylilled-cart', JSON.stringify(cart));
};

export const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1): CartItem[] => {
  const currentCart = getCartFromStorage();
  const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
  
  if (existingItemIndex >= 0) {
    // Item exists, update quantity (can be negative to decrease)
    const newQuantity = currentCart[existingItemIndex].quantity + quantity;
    if (newQuantity <= 0) {
      // Remove item if quantity becomes 0 or negative
      currentCart.splice(existingItemIndex, 1);
    } else {
      currentCart[existingItemIndex].quantity = newQuantity;
    }
  } else {
    // New item, add to cart only if quantity is positive
    if (quantity > 0) {
      currentCart.push({ ...item, quantity });
    }
  }
  
  saveCartToStorage(currentCart);
  return currentCart;
};

export const updateCartItemQuantity = (itemId: string, quantity: number): CartItem[] => {
  const currentCart = getCartFromStorage();
  const updatedCart = currentCart.map(item =>
    item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
  ).filter(item => item.quantity > 0);
  
  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const removeFromCart = (itemId: string): CartItem[] => {
  const currentCart = getCartFromStorage();
  const updatedCart = currentCart.filter(item => item.id !== itemId);
  
  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('jessylilled-cart');
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};