const Product = require("../../Models/ProductDb.js");
const Cart = require("../../Models/CartDb.js");

const deleteProductInCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    // jwt token validation
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find((item) => item.productId === productId);
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove only this product’s subtotal
    cart.totalAmount -= cartItem.quantity * cartItem.productPrice;

    // Remove item from array
    cart.items = cart.items.filter((item) => item.productId !== productId);

    // If all items removed, totalAmount must not go negative
    if (cart.items.length === 0) {
      cart.totalAmount = 0;
    }

    await cart.save();

    return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteProductInCart;
