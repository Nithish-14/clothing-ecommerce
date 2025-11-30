const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    res.json(cart || { items: [] });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, size, qty = 1 } = req.body;
    if (!productId)
      return res.status(400).json({ message: "productId required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, size, qty }],
      });
      return res.status(201).json(cart);
    }

    const existingIndex = cart.items.findIndex(
      (i) => String(i.product) === String(productId) && i.size === size
    );
    if (existingIndex > -1) {
      cart.items[existingIndex].qty += Number(qty);
    } else {
      cart.items.push({ product: productId, size, qty });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items))
      return res.status(400).json({ message: "items array required" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

    cart.items = items.map((i) => ({
      product: i.product._id,
      size: i.size,
      qty: i.qty,
    }));
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { itemId, size } = req.params;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => !(String(i._id) === String(itemId) && i.size === size)
    );

    await cart.save();

    return res.json(cart);
  } catch (err) {
    next(err);
  }
};
