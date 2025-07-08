const Auth = require("../../Models/AuthDb.js");

const getAllUsersController = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await Auth.find({});

        // If no users found, return an empty array
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        // Return the list of users
        return res.status(200).json(users);
    } catch (error) {
        // Log the error and return a 500 status code
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
module.exports = getAllUsersController;