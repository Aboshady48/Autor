require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./Config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require("./Routes/index.route");
const UserRouter = require("./Users/Routes/index.route.js");
const productRouter = require("./Product/Routes/index.route.js");
const CartRouter = require("./Cart/Routes/index.route.js");
const orderRouter = require("./Order/Router/index.route.js");
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;


// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (for Tailwind CSS)
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth',authRouter)
app.use('/api/users', UserRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', CartRouter);
app.use('/api/order',orderRouter)

// Start Server
app.listen(port, () => {
  console.log(`Server is running : http://localhost:${port}`);
});
