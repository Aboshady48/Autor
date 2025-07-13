const Cart = require('../../Models/CartDb.js');
const Product = require('../../Models/ProductDb.js');

const updateCartController = async (req, res) => {
  try {
    
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // jwt token validation
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized"});
    }
    
    const cart = await Cart.findOne({ userId });
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

    let cartItem = cart.items.find(item => item.productId === productId);

    if (cartItem) {
      // ✅ Subtract old subtotal
      cart.totalAmount -= cartItem.quantity * product.productPrice;

      // ✅ Update quantity
      cartItem.quantity = quantity;

      // ✅ Add new subtotal
      cart.totalAmount += product.productPrice * quantity;

    } else {
      // ✅ New product — only add
      cart.items.push({
        productId,
        productName: product.productName,
        productPrice: product.productPrice,
        productImage: product.imageUrl,
        quantity: quantity
      });

      cart.totalAmount += product.productPrice * quantity;
    }

    await cart.save();

    return res.status(200).json({ message: "Cart updated successfully" });

  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateCartController;
