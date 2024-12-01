
  export function ProductInfo({
    product,
    selectedSize,
    selectedColor,
    onSizeChange,
    onColorChange,
  }) {
    if (!product) return null;
    
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.detail}</p>
        {/* Sizes Section */}
        {product.sizes && product.sizes.length > [0] && (
          <div className="mb-6">
            <h3 className="font-medium mb-2">Select Size:</h3>
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
        )}
        {/* Colors Section */}
  
        {product.colors && product.colors.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Select Color:</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.name
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.selectedClass }}
                  onClick={() => onColorChange(color.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }