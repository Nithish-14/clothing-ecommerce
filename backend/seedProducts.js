require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");

const products = [
  {
    name: "Classic White Tee",
    description: "Comfort cotton t-shirt",
    price: 499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  {
    name: "Black Slim Jeans",
    description: "Stretch slim fit jeans",
    price: 1999,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    category: "Men",
    sizes: ["30", "32", "34", "36"],
    stock: 30,
  },
  {
    name: "Blue Denim Jacket",
    description: "Casual denim jacket",
    price: 2999,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 20,
  },
  {
    name: "Grey Hoodie",
    description: "Fleece hoodie",
    price: 1499,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985",
    category: "Unisex",
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    name: "Floral Summer Dress",
    description: "Light summer dress",
    price: 1799,
    image: "https://images.unsplash.com/photo-1520975918313-6d5c1a1a23af",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25,
  },
  {
    name: "Black Pencil Skirt",
    description: "Formal skirt",
    price: 1299,
    image: "https://images.unsplash.com/photo-1593032465171-c5dfb6e7f86d",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 15,
  },
  {
    name: "Running Shorts",
    description: "Quick-dry shorts",
    price: 799,
    image: "https://images.unsplash.com/photo-1599058918146-b3b6436031c5",
    category: "Men",
    sizes: ["S", "M", "L"],
    stock: 60,
  },
  {
    name: "Athleisure Leggings",
    description: "High-waist leggings",
    price: 1199,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 45,
  },
  {
    name: "Checked Shirt",
    description: "Casual checked shirt",
    price: 999,
    image: "https://images.unsplash.com/photo-1580983561371-7b94a5884dd9",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 35,
  },
  {
    name: "Striped Polo",
    description: "Cotton polo shirt",
    price: 899,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Men",
    sizes: ["S", "M", "L"],
    stock: 50,
  },
  {
    name: "Leather Jacket",
    description: "Faux leather biker jacket",
    price: 4999,
    image: "https://images.unsplash.com/photo-1542060748-10c28b62716c",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 10,
  },
  {
    name: "Maxi Dress",
    description: "Elegant evening maxi",
    price: 2499,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 12,
  },
  {
    name: "Cargo Pants",
    description: "Utility cargo trousers",
    price: 1599,
    image: "https://images.unsplash.com/photo-1618354691417-1e34dd969b5f",
    category: "Men",
    sizes: ["30", "32", "34"],
    stock: 20,
  },
  {
    name: "Bomber Jacket",
    description: "Lightweight bomber",
    price: 3499,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    category: "Unisex",
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
  },
  {
    name: "Casual Sneakers",
    description: "Comfort sneakers",
    price: 2999,
    image: "https://images.unsplash.com/photo-1600185365386-1ecdb62ccb6e",
    category: "Unisex",
    sizes: ["6", "7", "8", "9", "10"],
    stock: 80,
  },
  {
    name: "V-neck T-shirt",
    description: "Soft V-neck tee",
    price: 549,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 40,
  },
  {
    name: "Denim Skirt",
    description: "Mini denim skirt",
    price: 1199,
    image: "https://images.unsplash.com/photo-1603252109360-9096f32f7d40",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 22,
  },
  {
    name: "Blazer",
    description: "Formal blazer",
    price: 3999,
    image: "https://images.unsplash.com/photo-1593032465171-c5dfb6e7f86d",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 14,
  },
  {
    name: "Sports Bra",
    description: "Supportive sports bra",
    price: 799,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 55,
  },
  {
    name: "Windbreaker",
    description: "Rain-resistant jacket",
    price: 1899,
    image: "https://images.unsplash.com/photo-1601333144499-1fd8f6616c2b",
    category: "Unisex",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
