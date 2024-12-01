interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    category: "Men's Shoes",
    price: 160,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Nike ZoomX Vaporfly",
    category: "Running Shoes",
    price: 250,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Nike Dri-FIT ADV",
    category: "Running Jacket",
    price: 120,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3"
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover transform transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="font-medium">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}