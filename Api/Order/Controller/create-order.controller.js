const OrderDb = require('../../Models/OrderDb.js');
const Product = require('../../Models/ProductDb.js');
const Auth = require('../../Models/AuthDb.js');
const Cart = require('../../Models/CartDb.js');
const mongoose = require('mongoose');

const createOrderController = async (req, res) => {
    // Extract userId and cartId from the request body
  const { userId, cartId } = req.body;

  // Validate userId and cartId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId format" });
  }
  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ message: "Invalid cartId format" });
  }

  // Check if user and cart exist
  const user = await Auth.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const cart = await Cart.findById(cartId);
  if (!cart || cart.items.length === 0) {
    return res.status(404).json({ message: "Cart not found or empty" });
  }

  // Create order
  const order = new OrderDb({
    userId,
    items: cart.items,
    totalAmount: cart.totalAmount,
    shippingAddress: user.address,
    orderStatus: "Pending",
    orderDate: new Date(),
  });

  try {
    // Save the order
    const savedOrder = await order.save();

    // Optionally: clear the cart after order is placed
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    return res.status(201).json(savedOrder);

  }catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = createOrderController