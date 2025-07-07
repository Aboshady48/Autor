const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URL;
        if (!dbURI) {
            throw new Error("MONGODB_URL is not defined in .env file");
        }

        await mongoose.connect(dbURI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
