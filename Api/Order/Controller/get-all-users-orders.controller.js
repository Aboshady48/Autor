const OrderDb = require('../../Models/OrderDb.js');

const getAllOrdersController = async (req, res) => {
  try {
    // Get all orders
    const orders = await OrderDb.find({}).populate('userId', 'name email');

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting all orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getAllOrdersController;
