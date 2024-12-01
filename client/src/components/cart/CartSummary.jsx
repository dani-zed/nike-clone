import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function CartSummary({ items }) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link to="/checkout">
        <Button className="w-full mt-6">
          Proceed to Checkout
        </Button>
      </Link>

      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-2">We accept:</p>
        <div className="flex gap-2">
          <span className="px-2 py-1 border rounded">Visa</span>
          <span className="px-2 py-1 border rounded">Mastercard</span>
          <span className="px-2 py-1 border rounded">RazorPay</span>
        </div>
      </div>
    </div>
  );
}