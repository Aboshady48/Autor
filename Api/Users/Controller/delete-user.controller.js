const Auth = require("../../Models/AuthDb.js");

const DeleteUserController = async (req, res) => {
    try {
        // Extract user ID from request parameters
        const userId = req.params.id;

        // Fetch user by ID from the database
        const user = await Auth.findById(userId);

        // If user not found, return 404 status
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user from the database
        await Auth.findByIdAndDelete(userId);

        // Return success message
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = DeleteUserController;