import { useState, useEffect } from "react";
import { getProducts } from "../../lib/api"; // Assuming this API function fetches products

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: "", search: "", sortBy: "name", sortOrder: "asc" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, totalPages } = await getProducts({ ...filters, page });
        setProducts(data);
        setTotalPages(totalPages);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, page]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setPage(1); // Reset to the first page after applying filters
  };

  const handleSortChange = (sortType) => {
    const [sortBy, sortOrder] = sortType.split("-");
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy,
      sortOrder,
    }));
    setPage(1);
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center py-16">Loading products...</div>;
    }

    if (error) {
      return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    if (products.length === 0) {
      return <div className="text-center py-16">No products found. Try adjusting your filters.</div>;
    }

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow-md">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-gray-800 font-bold">{product.price}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => alert(`Added ${product.name} to cart`)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg mr-2"
          >
            Previous
          </button>
          <span className="flex items-center">{`Page ${page} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg ml-2"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex gap-4">
          {/* Add your filters and sorting components */}
          {/* Example: <ProductFilters onFilterChange={handleFilterChange} /> */}
          {/* Example: <ProductSort onSortChange={handleSortChange} /> */}
        </div>
      </div>

      {renderContent()}
    </div>
  );
}
