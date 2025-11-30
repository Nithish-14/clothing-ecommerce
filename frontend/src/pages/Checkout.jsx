import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);

    const orderData = { items: cart };

    try {
      const res = await createOrder(orderData);

      setTimeout(() => {
        navigate(`/order/${res.data.order._id}`);
      }, 500);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.map((item) => (
        <div
          key={item._id + item.size}
          className="flex justify-between border-b py-2"
        >
          <span>
            {item.product.name} ({item.size}) x {item.qty}
          </span>
          <span>${item.product.price * item.qty}</span>
        </div>
      ))}

      <div className="mt-4 text-right font-bold text-xl">
        Total: ${total.toFixed(2)}
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded 
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Placing Order...
          </span>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
}
