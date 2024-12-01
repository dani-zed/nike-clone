import React from 'react';
import { useCartStore } from '../../store/useCartStore';
import { createOrder, verifyPayment } from '../../lib/api';
import { Button } from '../ui/Button';

export function PaymentForm({ shippingAddress }) {
  const { items, clearCart } = useCartStore();

  const totalAmount = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.product.price
        })),
        shippingAddress,
        totalAmount
      };

      const { data } = await createOrder(orderData);

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'Nike Store',
        description: 'Thank you for your purchase',
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            await clearCart();
            window.location.href = '/order-success';
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com'
        },
        theme: {
          color: '#000000'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Could not initialize payment. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p className="text-lg mb-2">Order Summary</p>
        <div className="flex justify-between mb-4">
          <span>Subtotal</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Button
        onClick={handlePayment}
        className="w-full"
        size="lg"
      >
        Pay Now
      </Button>
    </div>
  );
}