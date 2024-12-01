import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { getProduct } from '../lib/api';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/useCartStore';
import { ProductImageGallery } from '../components/products/ProductImageGallery';
import { ProductInfo } from '../components/products/ProductInfo';

export function ProductDetail() {
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
        setSelectedSize(data.sizes[0]);
        setSelectedColor(data.colors[0]);
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
    addItem({
      product,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductImageGallery images={[product.image]} />
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
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}