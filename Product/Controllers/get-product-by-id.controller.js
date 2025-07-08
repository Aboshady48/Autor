const Product = require("../../Models/ProductDb.js");

const getProductByIdController = async (req, res) => {
    const { productId: id } = req.params;
  try {
    // Fetch product by ID from the database
    const product = await Product.findOne({ productId: id });

    // If product not found, return 404 status
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the product data
    return res.status(200).json(product);
  } catch (error) {
    // Log the error and return a 500 status code
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = getProductByIdController;