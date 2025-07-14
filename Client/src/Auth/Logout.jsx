import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Auth/logout.css";

export const Logout = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.get("http://localhost:3000/api/auth/logout", {
                withCredentials: true,
            });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
