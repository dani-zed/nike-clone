
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';
// import { useCartStore } from '../../store/useCartStore';
export function ProductCard({ product }) {
const navigate=useNavigate()
  // const addItem = useCartStore((state) => state.addItem);
  // const handleAddToCart = () => {
  //   console.log('adding to cart')
  //   addItem({
  //     product: {
  //       _id: product._id,
  //       title: product.title,
  //       price: product.discountPrice || product.price,
  //       image: product.images[0],
  //     },
  //     quantity: 1,
  //     size: product.sizes[0],
  //     color: product.colors[0]?.name || 'Default',
  //   });
  //   navigate('/cart')
  // };
  return (
    <div className="group">
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.images[0]}  // Use the first image
            alt={product.name}
            className="w-full h-80 object-cover transform transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-gray-600 mb-2">{product.color}</p> {/* Display product color */}
        <p className="font-medium">₹{product.price}</p>
      </Link>
      <Button
        onClick={()=>navigate(`/products/${product._id}`)}
        className="flex justify-center items-center w-full mt-4"
        variant="outline"
      >
        <ShoppingBag className="w-4 h-4 mr-2" />
        View Product
      </Button>
    </div>
  );
}