import { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import AdvancedFilters from "../components/AdvancedFilters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    size: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 12,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts(filters);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <AdvancedFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="text-center py-12 text-xl font-semibold">
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
