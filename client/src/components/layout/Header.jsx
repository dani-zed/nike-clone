import React from 'react';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header = () => (
  <>
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-12">
          <a href="/" className="text-2xl font-bold" aria-label="Nike Homepage">
            NIKE
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/new" className="hover:text-gray-600 transition-colors">
              New & Featured
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

        {/* Search, Cart, and Menu */}
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

          {/* Cart Button */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>
    </header>
  </>
);

export default Header;
