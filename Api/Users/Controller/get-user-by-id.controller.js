const Auth = require("../../Models/AuthDb.js");

const getUserByIdController = async (req, res) => {
    try {
        // Extract user ID from request parameters
        const userId = req.params.id;

        // Fetch user by ID from the database
        const user = await Auth.findById(userId);

        // If user not found, return 404 status
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Exclude password from the response
        const { password, ...userWithoutPassword } = user.toObject();

        // Return the user data
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        // Log the error and return a 500 status code
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = getUserByIdController;