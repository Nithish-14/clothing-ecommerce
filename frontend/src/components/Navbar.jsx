import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        ClothingStore
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
