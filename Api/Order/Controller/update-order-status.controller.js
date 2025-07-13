const OrderDb = require('../../Models/OrderDb.js');
const mongoose = require('mongoose');

const updateOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const newStatus = req.body.newStatus;

    // 1. Validate orderId format
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid orderId format" });
    }

    // 2. Validate newStatus presence
    if (!newStatus) {
      return res.status(400).json({ message: "New status is required" });
    }

    // 3. Find & update the order's status in one step
    const updatedOrder = await OrderDb.findByIdAndUpdate(
      orderId,
      { orderStatus: newStatus },
      { new: true }
    );

    // 4. Check if order exists
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 5. (Optional) If you snapshot `items` in the order, no need to update total here.
    // totalAmount should not change when updating status.

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder
    });

  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateOrderStatusController;
