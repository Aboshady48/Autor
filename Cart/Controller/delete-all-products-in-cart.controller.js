const Cart = require("../../Models/CartDb.js");

const deleteAllProductsInCart = async (req, res) => {
  try {
    
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    return res.status(200).json({ message: "All products deleted from cart" });
  } catch (error) {
    console.error("Error deleting all products in cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteAllProductsInCart;
