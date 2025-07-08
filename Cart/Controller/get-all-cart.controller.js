const Cart = require('../../Models/CartDb.js');

const getAllCartController = async (req, res) => {
    try {
        const carts = await Cart.find();
        return res.status(200).json(carts);
    } catch (error) {
        console.error("Error getting all carts:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getAllCartController;