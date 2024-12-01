import { useState, useEffect } from 'react';
import { getProducts } from '../lib/api';
import { ProductCard } from '../components/products/ProductCard';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSort } from '../components/products/ProductSort';

export function Products() {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', search: '' });
    const products = [
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '35',
          color: 'Black',
        },
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '35',
          color: 'Black',
        },
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
        {
          id:2,
          name:'Nike Air Max SC',
          href:"#",
imageSrc:"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7668d761-57a1-4ba6-b103-dcbe2d4cc2df/air-max-sc-shoes-FVn5sK.png",          
          imageAlt:"Nike Air jordan womens",
          price:'5995',
          color:'Black',
        }
        // More products...
      ]
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}