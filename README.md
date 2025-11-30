# 🛒 Full-Stack E‑Commerce (MERN + React + Tailwind)

A complete E‑Commerce platform containing authentication, products, cart, orders, filters, admin controls, and more.

---

# 🚀 Setup Guide

## 📦 Requirements

- Node.js 18+
- MongoDB (Local or Cloud MongoDB Atlas)
- npm / yarn

---

# ⚙️ Backend Setup

## 1️⃣ Install dependencies

```bash
cd backend
npm install
```

## 2️⃣ Create `.env` file

Create a new file:

```
backend/.env
```

## 3️⃣ Add the following environment variables:

### 🔐 **`.env.example`**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 4️⃣ Start backend server

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# 🖥️ Frontend Setup

## 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

## 2️⃣ Start Vite server

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔌 Backend API Routes

## 🧑‍💻 **Auth Routes** (`/api/auth`)

### **POST** `/register`

Register new user

### **POST** `/login`

Login user + sets HTTP‑Only JWT cookie

### **GET** `/logout`

Clears cookie

### **GET** `/me`

Returns logged-in user

---

## 📦 **Product Routes** (`/api/products`)

### **GET** `/`

Query params:

```
?search=shirt
&category=Men
&size=32
&minPrice=100
&maxPrice=1500
&page=1
&limit=12
```

Returns filtered product list.

### **GET** `/:id`

Get product details

---

## 🛒 **Cart Routes** (`/api/cart`)

### **GET** `/`

Get user cart

### **POST** `/add`

Body:

```
{
  "productId": "...",
  "size": "32",
  "qty": 1
}
```

### **DELETE** `/remove/:productId/:size`

Remove item from cart

---

## 📦 **Order Routes** (`/api/orders`)

### **POST** `/`

Create order
Returns order ID

### **GET** `/:id`

Get single order

### **GET** `/`

Get all orders for logged-in user

---

# 🎨 Frontend Features

- React + Vite
- TailwindCSS UI
- Context API
- Auth Context
- Cart Context
- Product Filters (search/category/size/price)
- Product page + Add to cart
- Checkout page
- Order page

---

# 📁 Folder Structure

```
frontend/
  src/
    components/
    context/
    pages/
    services/
backend/
  controllers/
  models/
  routes/
  middleware/
  utils/
```

---

# 📝 Notes

- Cart automatically merges guest localStorage cart after login
- Uses HTTP‑Only cookies for secure JWT
- Fully CORS configured for Vite + Express

---

# ✅ Project Ready to Run

Backend → `http://localhost:5000`
Frontend → `http://localhost:5173`
