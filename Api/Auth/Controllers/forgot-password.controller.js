const Auth = require("../../Models/AuthDb");
const nodemailer = require("nodemailer");

// Helper to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const forgetPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    // 1) Find user by email
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2) Generate a 6-digit OTP and expiry (e.g., 5 minutes)
    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    // 3) Save OTP and expiry to user document
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = otpExpiry;
    await user.save();

    // 4) Create test SMTP transporter with Ethereal
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // 5) Email content
    const mailOptions = {
      from: `"Your App" <${testAccount.user}>`,
      to: user.email,
      subject: "Your Password Reset OTP",
      html: `
        <h3>Hello ${user.name || "User"},</h3>
        <p>Your OTP to reset your password is:</p>
        <h2>${otp}</h2>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return res.status(200).json({
      message: `OTP sent to ${user.email}`,
      previewURL: nodemailer.getTestMessageUrl(info),
    });

  } catch (error) {
    console.error("Forget Password Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = forgetPasswordController;
