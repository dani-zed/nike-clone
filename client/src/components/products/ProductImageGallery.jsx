export function ProductImageGallery({ images }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-4">
        <img
          src={images[0]}
          alt="Product"
          className="w-full h-[600px] object-cover rounded-lg"
        />
      </div>
      <div className="space-y-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product view ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
}