const Cart = require("../Model/CartSchema");

//? Get User's Cart HF
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    if (!cart) return res.status(404).json({ message: "Cart is empty" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//? Add or Increase Quantity in Cart HF
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // If no cart, create a new one with products array initialized
      cart = new Cart({
        user: req.user.id,
        products: [{ product: productId, quantity }],
      });
    } else {
      // Ensure products array exists
      if (!Array.isArray(cart.products)) {
        cart.products = [];
      }

      const prodIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (prodIndex > -1) {
        cart.products[prodIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: err.message });
  }
};



//? Update Quantity in cart HF
exports.updateProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  if (quantity < 1)
    return res.status(400).json({ message: "Quantity must be at least 1" });
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const prodIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (prodIndex === -1)
      return res.status(404).json({ message: "Product not in cart" });

    cart.products[prodIndex].quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//? Remove Product from Cart HF
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
