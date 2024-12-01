import { useState, useEffect } from 'react';
import { getMyOrders } from '../lib/api';
import { formatDate } from '../lib/utils';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">Order #{order._id}</p>
                <p className="text-sm text-gray-600">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium capitalize" 
                style={{
                  backgroundColor: 
                    order.status === 'completed' ? 'rgb(220 252 231)' :
                    order.status === 'processing' ? 'rgb(254 249 195)' :
                    order.status === 'cancelled' ? 'rgb(254 226 226)' :
                    'rgb(229 231 235)',
                  color:
                    order.status === 'completed' ? 'rgb(22 163 74)' :
                    order.status === 'processing' ? 'rgb(161 98 7)' :
                    order.status === 'cancelled' ? 'rgb(220 38 38)' :
                    'rgb(107 114 128)'
                }}>
                {order.status}
              </span>
            </div>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} | ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}