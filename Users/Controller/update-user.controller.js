const Auth = require("../../Models/AuthDb.js");

const updateUserController = async (req, res) => {
    try{
        // Extract user ID from request parameters
        const userId = req.params.id;

        // Fetch user by ID from the database
        const user = await Auth.findById(userId);

        // If user not found, return 404 status
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user details with the data from the request body
        const updatedUser = await Auth.findByIdAndUpdate(userId, req.body, { new: true });

        // Exclude password from the response
        const { password, ...userWithoutPassword } = updatedUser.toObject();

        // Return the updated user data
        return res.status(200).json(userWithoutPassword);
    }
    catch(error){
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = updateUserController;