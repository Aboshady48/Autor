const express = require("express");
const UserRouter = express.Router();
const getAllUsersController = require("../Controller/get-all-users.controller.js");
const getUserByIdController = require("../Controller/get-user-by-id.controller.js");

UserRouter.get("/" , getAllUsersController);
UserRouter.get("/:id", getUserByIdController);
// UserRouter.put("/:id");
// UserRouter.delete("/:id");

module.exports = UserRouter;