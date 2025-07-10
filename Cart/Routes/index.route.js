const express = require("express");
const CartRouter = express.Router();
const createCartController = require("../Controller/create-cart.controller.js");
const getAllCartController = require("../Controller/get-all-cart.controller.js");
const updateCartController = require("../Controller/update-cart.controller.js");
const getCartByIdController = require("../Controller/get-cart-byId.controller.js");
const deleteProductInCart = require("../Controller/delete-product-in-cart.controller.js");
const deleteAllProductsInCart = require("../Controller/delete-all-products-in-cart.controller.js");

CartRouter.get("/" , getAllCartController);
CartRouter.post("/", createCartController);
CartRouter.delete("/", deleteAllProductsInCart);
CartRouter.get("/:productId", getCartByIdController);
CartRouter.put("/:productId", updateCartController);
CartRouter.delete("/:productId", deleteProductInCart);

module.exports = CartRouter;