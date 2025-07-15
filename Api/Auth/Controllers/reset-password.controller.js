const bcrypt = require("bcrypt");
const Auth = require("../../Models/AuthDb");
const jwt = require("jsonwebtoken");  

const resetPasswordController = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    //Find user by email
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Check OTP match and expiry
    if (user.resetPasswordOTP !== otp ||user.resetPasswordOTPExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    //Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    //Clear the OTP fields
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;

    await user.save();

    //Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    //Set JWT token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production HTTPS
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    });

    return res.status(200).json({ message: "Password has been reset successfully" , token});
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = resetPasswordController;
