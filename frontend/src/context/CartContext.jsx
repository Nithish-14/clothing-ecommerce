import { createContext, useState, useEffect, useContext } from "react";
import {
  getCart,
  addToCart as addToCartAPI,
  removeFromCart as removeFromCartAPI,
  updateCart,
} from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const syncCart = async () => {
      if (user) {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        let backendCart = [];
        try {
          const res = await getCart();
          backendCart = res.data.items || [];
        } catch {
          backendCart = [];
        }

        const merged = [...backendCart];

        localCart.forEach((localItem) => {
          const existing = merged.find(
            (item) =>
              item.product._id === localItem.product._id &&
              item.size === localItem.size
          );

          if (existing) {
            existing.qty += localItem.qty;
          } else {
            merged.push(localItem);
          }
        });

        await updateCart({ items: merged });

        localStorage.removeItem("cart");

        setCart(merged);
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(localCart);
      }
    };

    syncCart();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = async (product, size, quantity = 1) => {
    if (!user) {
      const existing = cart.find(
        (item) => item.product._id === product._id && item.size === size
      );

      if (existing) {
        const updated = cart.map((item) =>
          item.product._id === product._id && item.size === size
            ? { ...item, qty: item.qty + quantity }
            : item
        );

        setCart(updated);
      } else {
        const newItem = {
          product,
          size,
          qty: quantity,
          _id: product._id + size,
        };

        setCart((prev) => [...prev, newItem]);
      }

      return;
    }

    try {
      await addToCartAPI({
        productId: product._id,
        size,
        qty: quantity,
      });

      const res = await getCart();
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Failed to sync with backend:", err);
    }
  };

  const removeFromCart = async (productId, size) => {
    if (!user) {
      setCart((prev) =>
        prev.filter((item) => item._id !== productId || item.size !== size)
      );
      return;
    }

    try {
      await removeFromCartAPI(productId, size);

      const res = await getCart();
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Failed to sync remove:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
