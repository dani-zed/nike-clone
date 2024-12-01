import { useState, useEffect } from 'react';
import { getProducts } from '../lib/api';
import { ProductCard } from '../components/products/ProductCard';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSort } from '../components/products/ProductSort';

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '', search: '', sortBy: 'name', sortOrder: 'asc' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available, else start with an empty cart
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, totalPages } = await getProducts({ ...filters, page });
        setProducts(data);
        setTotalPages(totalPages);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, page]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item.productId === product.id);
      if (productExists) {
        return prevCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { productId: product.id, quantity: 1 }];
      }
    });
  };


  // const handleSort = (sort) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     sortBy: sort.field,
  //     sortOrder: sort.order,
  //   }));
  // };
  const handleSort = (sortType) => {
    const [sortBy, sortOrder] = sortType.split('-');
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy,
      sortOrder,
    }));
  };
  

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-80 rounded-lg mb-4" />
              <div className="bg-gray-200 h-4 w-2/3 mb-2" />
              <div className="bg-gray-200 h-4 w-1/3" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 text-center py-8">
          {error}
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No products found. Try adjusting your filters.
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}  />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg mr-2"
          >
            Previous
          </button>
          <span className="flex items-center">{`Page ${page} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg ml-2"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex gap-4">
          <ProductSort onSort={handleSort} />
          <ProductFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
