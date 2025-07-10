const Cart = require('../../Models/CartDb.js');
const Product = require('../../Models/ProductDb.js');
const Auth = require('../../Models/AuthDb.js');

const getCartByIdController = async()=>{
    try {
        // Get the productId from the request parameters
        const { productId } = req.params;
        // Find the cart by productId
        const cart = await Cart.findOne({ productId });
        // If the cart is not found, return a 404 status
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        // Return the cart
        return res.status(200).json(cart);
    } catch (error) {
        return error;
    }
}

module.exports = getCartByIdController