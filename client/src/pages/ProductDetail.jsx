import { useState, useEffect } from 'react';
import { useParams,useNavigate} from 'react-router-dom';

import { ShoppingBag, Heart } from 'lucide-react';
import { getProduct } from '../lib/api';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/useCartStore';
import { ProductImageGallery } from '../components/products/ProductImageGallery';
import { ProductInfo } from '../components/products/ProductInfo';
export function ProductDetail() {
  const navigate=useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProduct(id);
        setProduct(data);

        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0].name);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black" />
      </div>
    );
  }

  
  const handleAddToCart = () => {
    console.log('adding to cart')
  
    addItem(
      {
      product: {
        _id: product._id,
        title: product.title,
        price: product.discountPrice || product.price,
        image: product.images[0],
      },
      quantity: 1,
      size: product.sizes[0],
    color: product.colors[0]?.name || 'Default',
    });
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImageGallery images={product.images} />
        <div>
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
          />
          <div className="flex gap-4 mt-8">
            <Button onClick={handleAddToCart} className="flex-1">
              
              Add to Cart
            </Button>
            {/* <Button variant="outline">
              <Heart className="w-5 h-5" />
            </Button> */}
            <Button variant='outline'
            onClick={()=>navigate('/cart')}>
              <ShoppingBag className="w-5 h-5 mr-2" />
            </Button>
          </div>
          {product.highlights && product.highlights.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Product Highlights:</h3>
              <ul className="list-disc pl-5 text-gray-600">
                {product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
