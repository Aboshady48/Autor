const Cart = require('../../Models/CartDb.js');
const Product = require('../../Models/ProductDb.js');

const updateCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        product.stock -= quantity;
        await product.save();

        cart.quantity += quantity;
        cart.totalAmount += product.productPrice * quantity;
        await cart.save();

        return res.status(200).json({ message: "Cart updated successfully" });

    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = updateCartController
