import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <div className="space-y-4">
          <Link to="/orders">
            <Button variant="outline" className="w-full">
              View Orders
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}