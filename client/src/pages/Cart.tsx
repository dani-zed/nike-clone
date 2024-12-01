import { ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/useCartStore';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';

export function Cart() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add items to get started</p>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {items.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}
        </div>
        <CartSummary items={items} />
      </div>
    </div>
  );
}