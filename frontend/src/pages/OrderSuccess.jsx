import { useParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
      <p>
        Your order ID: <span className="font-mono">{id}</span>
      </p>
      <Link to="/products" className="text-blue-500 mt-4 inline-block">
        Continue Shopping
      </Link>
    </div>
  );
}
