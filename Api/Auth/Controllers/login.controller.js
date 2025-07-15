const Auth = require('../../Models/AuthDb');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await Auth.findOne({ email });
      // If user does not exist, return error
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      // If password is invalid, return error
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1y",
      });
      // Set JWT token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // true in production HTTPS
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      });
      // Exclude password from user object
      const { password: userPassword, ...userWithoutPassword } =user.toObject();
      // Send response with user data and token
      return res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

module.exports = loginController;

