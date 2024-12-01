import { useState, useEffect } from 'react';
import { getProducts } from '../lib/api';
import { ProductCard } from '../components/products/ProductCard';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSort } from '../components/products/ProductSort';

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', search: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex gap-4">
          <ProductSort onSort={(sort) => console.log(sort)} />
          <ProductFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-80 rounded-lg mb-4" />
              <div className="bg-gray-200 h-4 w-2/3 mb-2" />
              <div className="bg-gray-200 h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}