const express = require('express');
const Authrouter = express.Router();
const registerController = require('../Controllers/register.controller');
const loginController = require('../Controllers/login.controller');
const LogoutController = require('../Controllers/logout.controller');
const updatePasswordController = require('../Controllers/update-password.controller.js');

Authrouter.post('/register', registerController)

Authrouter.post('/login', loginController);

Authrouter.post("/logout", LogoutController);

Authrouter.put("/update-password", updatePasswordController);

Authrouter.post("/forgot-password", async (req, res) => {});

Authrouter.post("/reset-password", async (req, res) => {});


Authrouter.get("/", async (req, res) => {});

Authrouter.get("/:id", async (req, res) => {});

Authrouter.put("/:id", async (req, res) => {});

Authrouter.delete("/:id", async (req, res) => {});

module.exports = Authrouter;
