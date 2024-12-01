import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import  Footer  from './components/layout/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import{Cart} from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Orders } from './pages/Orders';
// import  Profile  from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PrivateRoute } from './components/auth/PrivateRoute';
import Navbar from './components/ui/Navbar';

function App() {
  return (
    <BrowserRouter>
     <Navbar/>
      <div className="min-h-screen flex flex-col">
       
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/orders" element={<Orders />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
