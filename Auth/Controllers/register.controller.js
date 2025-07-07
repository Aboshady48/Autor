const Auth = require('../../Models/AuthDb');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { name, email, password, age, gender, phone, address } = req.body;

  try {
    // Check if user exists
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Validate required fields
    if (!name || !email || !password || !age || !gender || !phone || !address) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Validate password strength
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate age is a number
    if (isNaN(age)) {
      return res.status(400).json({ message: "Age must be a number" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new Auth({
      name,
      email,
      password: hashedPassword,
      age: parseInt(age, 10),
      gender,
      phone,
      address,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    // Set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
    });

        // Return the user data and token
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registerController;
