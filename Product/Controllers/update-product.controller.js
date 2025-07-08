const Product = require("../../Models/ProductDb.js");

const updateProductController = async (req, res) => {
  // Get productId from params, NOT body
  const productId = req.params.productId;

  try {
    // Check if the product exists
    const existingProduct = await Product.findOne({ productId: productId });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product with the body fields
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: productId },
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProductController;
