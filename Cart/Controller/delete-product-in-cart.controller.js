const Product = require("../../Models/ProductDb.js");
const Cart = require("../../Models/CartDb.js");

const deleteProductInCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;

    // Find product by custom productId field
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.productId === productId
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.totalAmount -= product.productPrice * cartItem.quantity;

    cart.items = cart.items.filter(
      (item) => item.productId !== productId
    );

    await cart.save();

    return res.status(200).json({ message: "Product removed from cart successfully" });

  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteProductInCart;
