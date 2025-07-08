const bycrpt = require("bcrypt");
const Auth = require('../../Models/AuthDb');


const updatePasswordController = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Validate input
        if (!userId || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide userId, oldPassword, and newPassword" });
        }

        // Find user by ID
        const user = await Auth.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if old password matches
        const isMatch = await bycrpt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }

        // Hash new password
        const salt = await bycrpt.genSalt(12);
        const hashedNewPassword = await bycrpt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" }); 
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

module.exports = updatePasswordController;
