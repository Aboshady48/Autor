const express = require('express');
const Authrouter = express.Router();
const registerController = require('../Controllers/register.controller');


Authrouter.post('/register', registerController)

Authrouter.post('/login', async (req, res) => {
})

Authrouter.post("/logout", async (req, res) => {});

Authrouter.get("/:id", async (req, res) => {
});

Authrouter.put("/:id", async (req, res) => {
});

Authrouter.put("/password", async (req, res) => {

});

Authrouter.post("/forgot-password", async (req, res) => {});

Authrouter.post("/reset-password", async (req, res) => {

});

module.exports = Authrouter;
