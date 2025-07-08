const Cart = require('../../Models/CartDb.js');
const Product = require('../../Models/ProductDb.js');

const createCartController = async (req, res) => {
    try {
        const { productId, productName, productPrice, productImage, quantity, totalAmount } = req.body;
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const newCart = new Cart({
            productId,
            productName,
            productPrice,
            productImage,
            quantity,
            totalAmount,
        });
        await newCart.save();
        return res.status(201).json({ message: "Cart created successfully" });
    } catch (error) {
        console.error("Error creating cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = createCartController;