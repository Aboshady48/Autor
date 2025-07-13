const Product = require("../../Models/ProductDb.js");


const createProductController = async (req, res) => {
    // Extract product details from the request body
    const { productId, productName, productPrice, productDescription, productBrand, productCategory, imageUrl, stock } = req.body;
    try {
        // Check if the product already exists
        const existingProduct = await Product.findOne({ productId });
        if (existingProduct) {
            return res.status(400).json({ message: "Product already exists" });
        }
        // Create a new product
        const newProduct = new Product({
            productId,
            productName,
            productPrice,
            productDescription,
            productBrand,
            productCategory,
            imageUrl,
            stock,
        });
        // Save the new product to the database
        await newProduct.save();
        // Return a success response
        return res.status(201).json({ message: "Product created successfully" });
        
    } catch (error) {
        // Log the error and return a 500 status code
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = createProductController;