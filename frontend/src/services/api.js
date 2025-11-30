import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ===== Products =====
export const getAllProducts = (filters = {}) => {
  return API.get("/products", { params: filters });
};
export const getProductById = (id) => API.get(`/products/${id}`);

// ===== Auth =====
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const logoutUser = () => API.post("/auth/logout");

// ===== Cart =====
export const addToCart = (cartData) => API.post("/cart/add", cartData);
export const getCart = () => API.get("/cart");
export const updateCart = (cartData) => API.put("/cart/update", cartData);
export const removeFromCart = (productId, size) =>
  API.delete(`/cart/remove/${productId}/${size}`);

// ===== Orders =====
export const createOrder = (orderData) => API.post("/orders", orderData);
export const getMyOrders = () => API.get("/orders/my");

export default API;
