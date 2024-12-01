import { create } from 'zustand';
import { updateCart } from '../lib/api';

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],  // Load from localStorage
  isUpdating: false,

  addItem: async (item) => {
    if (!item || !item.product || !item.product._id || !item.size || !item.color) {
      console.error('Invalid item:', item);
      return;
    }

    if (get().isUpdating) return;
    set({ isUpdating: true });

    try {
      const items = [...get().items];
      const existingItem = items.find(
        (i) =>
          i.product._id === item.product._id &&
          i.size === item.size &&
          i.color === item.color
      );

      if (existingItem) {
        const updatedItems = items.map((i) =>
          i.product._id === item.product._id &&
          i.size === item.size &&
          i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
        await updateCart(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));  // Save to localStorage
        set({ items: updatedItems });
      } else {
        items.push(item);
        await updateCart(items);
        localStorage.setItem('cart', JSON.stringify(items));  // Save to localStorage
        set({ items });
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      set({ isUpdating: false });
    }
  },

  removeItem: async (productId) => {
    if (!productId) {
      console.error('Invalid productId:', productId);
      return;
    }

    try {
      const items = get().items.filter((item) => item.product._id !== productId);
      await updateCart(items);
      localStorage.setItem('cart', JSON.stringify(items));  // Save to localStorage
      set({ items });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (!productId || quantity <= 0) {
      console.error('Invalid productId or quantity:', { productId, quantity });
      return;
    }

    try {
      const items = get().items.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      );
      await updateCart(items);
      localStorage.setItem('cart', JSON.stringify(items));  // Save to localStorage
      set({ items });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  },

  clearCart: async () => {
    try {
      await updateCart([]);
      localStorage.removeItem('cart');  // Clear from localStorage
      set({ items: [] });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  },
}));
