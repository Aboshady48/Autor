const jwt = require("jsonwebtoken");
const Auth = require("../../Models/AuthDb.js");

const LogoutController = async (req, res) => {
  try {
    res.clearCookie("token",{
      httpOnly: true,
      secure :false
    }); // Clear the token cookie
    res.status(200).json({ message: "User logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = LogoutController;
