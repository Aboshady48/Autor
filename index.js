require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./Config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require("./Routes/index.route");
// const UserRouter = require("./Users/index.route");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth',authRouter)
// app.use('/api/users', UserRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running : http://localhost:${port}`);
});
