const express = require("express");
const CartRouter = express.Router();
const createCartController = require("../Controller/create-cart.controller.js");
const getAllCartController = require("../Controller/get-all-cart.controller.js");
const updateCartController = require("../Controller/update-cart.controller.js");


CartRouter.get("/" , getAllCartController);
CartRouter.get("/:productId", getCartByIdController);
CartRouter.post("/", createCartController);
CartRouter.put("/:productId", updateCartController);
CartRouter.delete("/:productId", deleteCartController);

module.exports = CartRouter;