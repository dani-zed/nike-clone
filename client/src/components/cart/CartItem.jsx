import { Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div className="flex gap-6 py-6 border-b">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-gray-600 text-sm">
              Size: {item.size} | Color: {item.color}
            </p>
          </div>
          <p className="font-medium">₹{item.product.price}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <select
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.product._id, parseInt(e.target.value))
            }
            className="border rounded-md px-2 py-1"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            onClick={() => removeItem(item.product._id)}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}