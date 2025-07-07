const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./Config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB
connectDB();

// Start Server
app.listen(port, () => {
  console.log(`Server is running : http://localhost:${port}`);
});
