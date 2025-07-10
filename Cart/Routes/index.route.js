const express = require("express");
const CartRouter = express.Router();
const authMiddleware = require("../../Middleware/authMiddleware.js");

const createCartController = require("../Controller/create-cart.controller.js");
const getAllCartController = require("../Controller/get-all-cart.controller.js");
const updateCartController = require("../Controller/update-cart.controller.js");
const getCartByIdController = require("../Controller/get-cart-byId.controller.js");
const deleteProductInCart = require("../Controller/delete-product-in-cart.controller.js");
const deleteAllProductsInCart = require("../Controller/delete-all-products-in-cart.controller.js");

// Public for admin:
CartRouter.get("/", getAllCartController); // for admin only

// Create new cart or add product
CartRouter.post("/", authMiddleware, createCartController);

// Get current user's cart
CartRouter.get("/me", authMiddleware, getCartByIdController);

// Update user's cart (add/update quantity)
CartRouter.put("/me", authMiddleware, updateCartController);

// Delete all products in user's cart
CartRouter.delete("/me", authMiddleware, deleteAllProductsInCart);

// Delete ONE product from user's cart
CartRouter.delete("/me/:productId", authMiddleware, deleteProductInCart);

module.exports = CartRouter;
