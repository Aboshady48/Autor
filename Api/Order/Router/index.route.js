const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../../Middleware/authMiddleware.js");
const createOrderController =  require("../Controller/create-order.controller.js");
const getOrderByIdController = require("../Controller/get-order-by-id.controller.js");
const updateOrderStatusController = require("../Controller/update-order-status.controller.js");
const getAllUsersOrdersController = require("../Controller/get-all-users-orders.controller.js");

orderRouter.post("/", authMiddleware, createOrderController); // Create a new order
orderRouter.get("/", getAllUsersOrdersController); // Get all orders (for admin only)
orderRouter.get("/:orderId", authMiddleware ,getOrderByIdController); // Get order by id
orderRouter.put("/:orderId", authMiddleware, updateOrderStatusController); // Update order status by id (for admin only)

module.exports = orderRouter;