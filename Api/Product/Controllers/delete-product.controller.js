const Product = require("../../Models/ProductDb.js");

const deleteProductController = async (req, res) => {
  // Get the productId from the request parameters
  const productId = req.params.productId;

  try {
    // Delete by custom productId, not by _id
    const deletedProduct = await Product.findOneAndDelete({ productId: productId });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteProductController;
