const mongoose = require('mongoose');
const Cart = require('../../Models/CartDb.js');
const Product = require('../../Models/ProductDb.js');

const createCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.user._id; // Use from JWT!

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Check product exists
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId: product.productId,
            productName: product.productName,
            productPrice: product.productPrice,
            productImage: product.imageUrl,
            quantity,
          },
        ],
        totalAmount: product.productPrice * quantity,
      });

    } else {
      const cartItem = cart.items.find(item => item.productId === productId);

      if (cartItem) {
        // Remove old subtotal
        cart.totalAmount -= cartItem.quantity * product.productPrice;

        // Update quantity to new
        cartItem.quantity += quantity; // OR replace with `= quantity` if you want

        // Add new subtotal
        cart.totalAmount += cartItem.quantity * product.productPrice;

      } else {
        // New item → just push and add
        cart.items.push({
          productId: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          productImage: product.imageUrl,
          quantity,
        });

        cart.totalAmount += product.productPrice * quantity;
      }
    }

    await cart.save();

    return res.status(201).json({ message: "Product added to cart successfully" });

  } catch (error) {
    console.error("Error creating/updating cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createCartController;
