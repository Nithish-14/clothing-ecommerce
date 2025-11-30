import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useContext(CartContext);

  const cartItems = Array.isArray(cart)
    ? cart
    : cart.items?.map((i) => ({
        ...i.product,
        size: i.size,
        quantity: i.qty,
      })) || [];

  console.log(cartItems);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/products" className="text-blue-500">
            Shop now
          </Link>
        </p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item._id + item.size} item={item} />
          ))}

          <div className="mt-4 text-right font-bold text-xl">
            Total: ₹{total.toFixed(2)}
          </div>

          <Link
            to="/checkout"
            className="bg-green-500 text-white px-4 py-2 mt-2 inline-block rounded"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}
