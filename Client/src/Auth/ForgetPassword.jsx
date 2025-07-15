import axios from "axios";
import { useState } from "react";
import '../Style/Auth/forget-password.css';
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // STEP 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setPreviewURL("");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        { email }
      );

      setSuccess(data.message || "OTP sent to your email!");
      if (data.previewURL) {
        setPreviewURL(data.previewURL);
      }
      setStep(2); // Go to reset step
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // ✅ Only check confirm password on frontend
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        {
          email,
          otp,
          newPassword, // ✅ Matches backend: no `confirmPassword` field sent!
        },
        { withCredentials: true } // ✅ important to store cookie
      );

      // ✅ Save JWT if returned
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setSuccess(data.message || "Password has been reset!");
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");

      // ✅ Go back to login or home
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      setStep(1);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>{step === 1 ? "Forgot Password" : "Reset Password"}</h2>

        <form onSubmit={step === 1 ? handleSendOTP : handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP Code"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? step === 1
                ? "Sending..."
                : "Resetting..."
              : step === 1
              ? "Send OTP"
              : "Reset Password"}
          </button>
        </form>

        {success && <p className="success-message">{success}</p>}
        {previewURL && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a
              href={previewURL}
              target="_blank"
              rel="noopener noreferrer"
              className="preview-link"
            >
              👉 View OTP Email
            </a>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};
