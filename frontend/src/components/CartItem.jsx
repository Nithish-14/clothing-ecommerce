import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3 className="font-bold">{item.product.name}</h3>
        <p>Size: {item.size}</p>
        <p>Qty: {item.qty}</p>
      </div>
      <div>
        <p>${item.product.price * item.qty}</p>
        <button
          className="bg-red-500 px-2 py-1 rounded mt-1"
          onClick={() => removeFromCart(item._id, item.size)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
