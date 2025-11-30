const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const sendOrderEmail = require("../utils/sendEmail");
const User = require("../models/User");

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    for (const item of cart.items) {
      if (item.product.stock < item.qty) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${item.product.name}` });
      }
    }

    const orderItems = cart.items.map((i) => ({
      product: i.product._id,
      name: i.product.name,
      size: i.size,
      qty: i.qty,
      price: i.product.price,
    }));

    const totalPrice = orderItems.reduce(
      (sum, it) => sum + it.price * it.qty,
      0
    );

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      shippingAddress: req.body.shippingAddress || "",
    });

    // Reduce stock
    for (const i of cart.items) {
      const prod = await Product.findById(i.product._id);
      prod.stock = Math.max(0, prod.stock - i.qty);
      await prod.save();
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    // Send email
    const user = await User.findById(userId);
    try {
      await sendOrderEmail(order, user);
    } catch (emailErr) {
      console.error("Email send failed", emailErr);
    }

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price image category")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
};
