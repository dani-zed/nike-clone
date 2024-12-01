import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/useCartStore';

export function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      product,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0]
    });
  };

  return (
    <div className="group">
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.imageSrc}
            // src={product.image}
            alt={product.imageAlt}
            className="w-full h-80 object-cover transform transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        {/* <p className="text-gray-600 mb-2">{product.category}</p> */}
        <p className="text-gray-600 mb-2">{product.color}</p>
        <p className="font-medium">₹{product.price}</p>
      </Link>
      <Button
        onClick={handleAddToCart}
        className="w-full mt-4"
        variant="outline"
      >
        <ShoppingBag className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    </div>
  );
}