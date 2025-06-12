const Cart = require("../Model/CartSchema");
const Product = require("../Model/ProductSchema");
//? Get User's Cart HF
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    if (!cart) return res.status(200).json({ message: "Cart is empty" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//? Add or Increase Quantity in Cart HF
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1, title, price } = req.body;

  try {
    // Find existing cart for the user

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Create new cart with the product
      cart = new Cart({
        user: req.user.id,
        items: [
          {
            productId,
            // productType,
            title,
            quantity,
            price,
          },
        ],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Product already exists, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({
          productId,
          // productType,
          title,
          quantity,
          price,
        });
      }
    }

    await cart.save();
    res.status(200).json({ status: "Success", cart });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ error: err.message });
  }
};

//? Update Quantity in cart HF
exports.updateProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Update quantity error:", err);
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
