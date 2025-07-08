const express = require("express");
const UserRouter = express.Router();
const getAllUsersController = require("../Controller/get-all-users.controller.js");

UserRouter.get("/" , getAllUsersController);
// UserRouter.get("/:id");
// UserRouter.put("/:id");
// UserRouter.delete("/:id");

module.exports = UserRouter;