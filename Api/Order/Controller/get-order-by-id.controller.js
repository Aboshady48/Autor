const OrderDb = require('../../Models/OrderDb.js');
const Product = require('../../Models/ProductDb.js');
const Auth = require('../../Models/AuthDb.js');
const Cart = require('../../Models/CartDb.js');
const mongoose = require('mongoose');

const getOrderByIdController = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        // Validate orderId
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid orderId format" });
        }
        const order = await OrderDb.findById(orderId);
        // Check if order exists
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(order);
        
    } catch (error) {
        console.error("Error getting order by id:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
module.exports = getOrderByIdController