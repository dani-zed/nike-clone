import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';

export function Register() {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  //   firstName: '',
  //   lastName: ''
  // });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const testFormData = {
  //   email: 'test@example.com',
  //   password: 'password123',
  //   firstName: 'John',
  //   lastName: 'Doe',
  // };
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData)
      await register(email,password,firstName,lastName);
      navigate('/');
    } catch (error) {
      setError(error.message || JSON.stringify(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                // value={formData.firstName}
                value={firstName}
                // onChange={handleChange}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                // value={formData.lastName}
                // onChange={handleChange}
                value={lastName}

                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              value={email}

              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              // value={formData.password}
              // onChange={handleChange}
              value={password}

              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}