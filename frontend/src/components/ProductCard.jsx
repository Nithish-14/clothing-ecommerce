import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded hover:shadow-lg">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="mt-2 font-bold">{product.name}</h2>
        <p className="text-gray-700">${product.price}</p>
      </Link>
    </div>
  );
}
