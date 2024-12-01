import React, { useState, useEffect } from 'react';
// import { getMyOrders, updateUserProfile } from '../api'; // API functions
import { getMyOrders } from '../api'; // API functions
import { useAuthStore } from '../store/useAuthStore'; // For user authentication state
import { Button } from '../components/ui/Button';
export function UserProfile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userInfo, logout } = useAuthStore(); // Custom hook for auth management
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
      fetchOrders();
    }
  }, [userInfo]);
  const fetchOrders = async () => {
    try {
      const orderData = await getMyOrders();
      setOrders(orderData);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };
  const handleEditToggle = () => {
    setEditing(!editing);
    setFormData(user);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//   const handleSave = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const updatedUser = await updateUserProfile(formData);
//       setUser(updatedUser);
//       setEditing(false);
//     } catch (err) {
//       setError('Failed to update profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          {editing ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>First Name:</strong> {user?.firstName}</p>
              <p><strong>Last Name:</strong> {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
          )}
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          {editing ? (
            <>
              <Button onClick={handleSave} disabled={loading} className="mr-2">
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button onClick={handleEditToggle} variant="secondary">Cancel</Button>
            </>
          ) : (
            <Button onClick={handleEditToggle} className="mr-2">Edit Profile</Button>
          )}
          <Button onClick={handleLogout} variant="danger">Logout</Button>
        </div>
      </div>
    </div>
  );
}