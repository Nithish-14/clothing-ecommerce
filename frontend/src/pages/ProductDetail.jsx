import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 h-auto object-cover rounded"
      />

      <div className="flex-1">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2">${product.price}</p>
        <p className="mt-2">{product.description}</p>

        <div className="mt-4">
          <label className="mr-2">Size:</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Select</option>
            {product.sizes?.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="font-medium">Quantity:</span>

          <button
            onClick={decrease}
            className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            disabled={quantity <= 1}
          >
            -
          </button>

          <span className="text-lg">{quantity}</span>

          <button onClick={increase} className="bg-gray-300 px-3 py-1 rounded">
            +
          </button>
        </div>

        <Link to="/cart" className="inline-block mt-4 text-blue-500">
          <button
            onClick={() => addToCart(product, size, quantity)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded disabled:opacity-50"
            disabled={!size}
          >
            Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}
