const express = require("express");
const UserRouter = express.Router();

UserRouter.get("/")
UserRouter.get("/:id");
UserRouter.put("/:id");
UserRouter.delete("/:id");

module.exports = UserRouter;