export function ProductInfo({
  product,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-2xl font-medium mb-6">₹{product.price}</p>
      <p className="text-gray-600 mb-8">{product.description}</p>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Select Size</h3>
        <div className="grid grid-cols-4 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`py-2 rounded-md border ${
                selectedSize === size
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-black'
              }`}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Select Color</h3>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color ? 'border-black' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}