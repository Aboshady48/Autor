const mongoose = require('mongoose');
const Cart = require('../../Models/CartDb.js');

const getCartByIdController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);

  } catch (error) {
    console.error("Error getting cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getCartByIdController;
