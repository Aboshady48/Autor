const express = require('express');
const authRouter = express.Router();
const Authrouter = require('../Auth/index.route');


authRouter.use('/', Authrouter);

module.exports = authRouter;