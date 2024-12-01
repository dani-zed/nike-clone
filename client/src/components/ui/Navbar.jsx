// import React, { useState } from "react";
// import { ShoppingBag, Menu, Search } from "lucide-react";
// import { useAuthStore } from "../../store/useAuthStore"; // Adjust the import path based on your project structure
// import {Link,useNavigate} from 'react-router-dom';
// // Custom Button Component
// const Button = ({
//   children,
//   variant = "default",
//   size = "default",
//   className = "",
//   onClick,
//   href,
//   ...props
// }) => {
//   const baseStyles =
//     "inline-flex items-center justify-center rounded-full transition-colors";

//   const variantStyles = {
//     default: "bg-black text-white hover:bg-gray-800",
//     secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200",
//     outline: "bg-transparent border border-gray-300 hover:bg-gray-100",
//   };

//   const sizeStyles = {
//     default: "px-4 py-2 text-sm",
//     icon: "w-10 h-10 p-2",
//     sm: "px-3 py-1 text-xs",
//   };

//   const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

//   if (href) {
//     return (
//       <a href={href} className={combinedClassName} {...props}>
//         {children}
//       </a>
//     );
//   }

//   return (
//     <button className={combinedClassName} onClick={onClick} {...props}>
//       {children}
//     </button>
//   );
// };
// const navigate=useNavigate()

// const Navbar = () => {
//   const { token, user, login, logout } = useAuthStore(); // Access auth state from zustand store
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogin = async () => {
//     const email = prompt("Enter email:");
//     const password = prompt("Enter password:");
//     if (email && password) {
//       try {
//         await login(email, password);
//         alert("Logged in successfully!");
//       } catch (error) {
//         console.error("Login failed:", error.response?.data || error.message);
//         alert("Failed to log in. Please try again.");
//       }
//     } else {
//       alert("Email and password are required.");
//     }
//   };

//   const handleLogout = () => {
//     logout(); // Log out using zustand store
//     alert("Logged out successfully!");
//   };

//   const toggleMobileMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
//       <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
//         {/* Logo and Navigation Links */}
//         <div className="flex items-center gap-12">
//           <a href="/" className="text-2xl font-bold" aria-label="Nike Homepage">
//             NIKE
//           </a>
//           <div className="hidden md:flex items-center gap-8">
//             <a href="/new" className="hover:text-gray-600 transition-colors">
//               New & Featured
//             </a>
//             <a href="/men" className="hover:text-gray-600 transition-colors">
//               Men
//             </a>
//             <a href="/women" className="hover:text-gray-600 transition-colors">
//               Women
//             </a>
//             <a href="/kids" className="hover:text-gray-600 transition-colors">
//               Kids
//             </a>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Search Bar */}
//           <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full focus-within:ring focus-within:ring-gray-300">
//             <Search className="w-5 h-5 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="bg-transparent outline-none placeholder:text-gray-500 text-sm w-32"
//               aria-label="Search for products"
//             />
//           </div>

//           {/* Login Section */}
//           <div className="flex items-center gap-4">
//             {token ? (
//               <>
//                 <Button variant="secondary" onClick={handleLogout}>
//                   Logout
//                 </Button>
//                 <Button variant="default" href="/profile">
//                   My Profile
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   variant="secondary"
//                   onClick={() => navigate("/register")}
//                 >
//                   Join Us
//                 </Button>
//                 <Button variant="default" onClick={handleLogin}>
//                   Login
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Cart Button */}
//           <Button variant="outline" size="icon" aria-label="View Cart">
//             <ShoppingBag className="w-5 h-5" />
//           </Button>

//           {/* Mobile Menu Toggle */}
//           <Button
//             variant="outline"
//             size="icon"
//             className="md:hidden"
//             onClick={toggleMobileMenu}
//             aria-label="Open Menu"
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { ShoppingBag, Menu, Search } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore"; // Adjust the import path based on your project structure
import { Link, useNavigate } from 'react-router-dom';
import NikeLogo from '../../assets/favicon.ico'

// Custom Button Component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  href,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full transition-colors";

  const variantStyles = {
    default: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    outline: "bg-transparent border border-gray-300 hover:bg-gray-100",
  };

  const sizeStyles = {
    default: "px-4 py-2 text-sm",
    icon: "w-10 h-10 p-2",
    sm: "px-3 py-1 text-xs",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const Navbar = () => {
  const { token, logout } = useAuthStore(); // Access auth state from zustand store
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();


  const handleLogout = () => {
    logout(); // Log out using zustand store
   navigate('/')
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <nav className="flex items-center justify-around max-w-7xl mx-auto px-4 py-4">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-12">
          <Link to="/">
          <div className="text-2xl font-bold" aria-label="Nike Homepage">
          <img src={NikeLogo} alt="Nike" />
          </div>
          </Link>
          <div className="hidden md:flex items-center justify-between gap-8">
          <a href="/products" className="hover:text-gray-600 transition-colors">
             Products
            </a>
            <a href="/men" className="hover:text-gray-600 transition-colors">
              Men
            </a>
            <a href="/women" className="hover:text-gray-600 transition-colors">
              Women
            </a>
            <a href="/kids" className="hover:text-gray-600 transition-colors">
              Kids
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full focus-within:ring focus-within:ring-gray-300">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none placeholder:text-gray-500 text-sm w-32"
              aria-label="Search for products"
            />
          </div>

          {/* Login Section */}
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
                <Button variant="default" href="/profile">
                  My Profile
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/register")} // Navigates to the Register page
                >
                  Join Us
                </Button>
                <Button variant="default" onClick={() => navigate("/login")}> {/* Navigates to the Login page */}
                  Login
                </Button>
              </>
            )}
          </div>

          {/* Cart Button */}
          <Button variant="outline" size="icon" aria-label="View Cart">
            <ShoppingBag className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
