const Product = require("../../Models/ProductDb.js");

const getAllProductsController = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find({});

        // If no products found, return an empty array
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        // Return the list of products
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getAllProductsController;