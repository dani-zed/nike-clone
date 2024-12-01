import { create } from 'zustand';
import { updateCart } from '../lib/api';

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: async (item) => {
    const items = [...get().items];
    const existingItem = items.find(
      (i) =>
        i.product._id === item.product._id &&
        i.size === item.size &&
        i.color === item.color
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }

    await updateCart(items);
    set({ items });
  },
  removeItem: async (productId) => {
    const items = get().items.filter((item) => item.product._id !== productId);
    await updateCart(items);
    set({ items });
  },
  updateQuantity: async (productId, quantity) => {
    const items = get().items.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    await updateCart(items);
    set({ items });
  },
  clearCart: async () => {
    await updateCart([]);
    set({ items: [] });
  },
}));