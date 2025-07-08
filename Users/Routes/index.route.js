const express = require("express");
const UserRouter = express.Router();
const getAllUsersController = require("../Controller/get-all-users.controller.js");
const getUserByIdController = require("../Controller/get-user-by-id.controller.js");
const updateUserController = require("../Controller/update-user.controller.js");
const DeleteUserController = require("../Controller/delete-user.controller.js");

UserRouter.get("/" , getAllUsersController);
UserRouter.get("/:id", getUserByIdController);
UserRouter.put("/:id", updateUserController);
UserRouter.delete("/:id" , DeleteUserController);

module.exports = UserRouter;