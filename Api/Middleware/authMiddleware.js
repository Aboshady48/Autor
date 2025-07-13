const jwt = require("jsonwebtoken");
const Auth = require("../Models/AuthDb.js");

const authMiddleware = async (req, res, next) => {
  try {
    // Expect: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    // Check if token is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract tokenfrom Authorization header
    const token = authHeader.split(" ")[1];
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Check if user exists
    const user = await Auth.findById(decoded.userId || decoded.id);
    // If user does not exist, return error
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
