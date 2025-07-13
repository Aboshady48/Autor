const express = require('express');
const Authrouter = express.Router();
const registerController = require('../Controllers/register.controller');
const loginController = require('../Controllers/login.controller');
const LogoutController = require('../Controllers/logout.controller');
const updatePasswordController = require('../Controllers/update-password.controller.js');
const forgetPasswordController = require('../Controllers/forgot-password.controller.js');
const resetPasswordController = require('../Controllers/reset-password.controller.js');


Authrouter.post('/register', registerController)

Authrouter.post('/login', loginController);

Authrouter.post("/logout", LogoutController);

Authrouter.post("/forgot-password", forgetPasswordController);

Authrouter.post("/reset-password", resetPasswordController);

Authrouter.put("/update-password", updatePasswordController);


module.exports = Authrouter;
