import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Register } from "../Auth/Register";
import { Login } from "../Auth/Login";
import { ForgetPassword } from "../Auth/ForgetPassword.jsx";
import { Admin } from "../Dashboard/Admin";
import { Home } from "./Home.jsx";
import "../Style/Components/Navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  // Check cookie for JWT token
  useEffect(() => {
    const tokenExists = document.cookie.split(";").some((cookie) =>
      cookie.trim().startsWith("token=")
    );
    setHasToken(tokenExists);
  }, []);

  const handleLogout = () => {
    // Remove token cookie by expiring it
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setHasToken(false);
    setIsOpen(false);
    navigate("/");
  };

  // Block access to login/register/forgot if logged in
  const ProtectedRoute = ({ element }) => {
    if (hasToken) {
      navigate("/");
      return null;
    }
    return element;
  };

  // Allow access to admin ONLY if logged in
  // const AdminProtectedRoute = ({ element }) => {
  //   if (!hasToken) {
  //     navigate("/login");
  //     return null;
  //   }
  //   return element;
  // };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">MyApp</div>

        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          {!hasToken && (
            <>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/forget-password" onClick={() => setIsOpen(false)}>
                  Forgot Password
                </Link>
              </li>
            </>
          )}

          {hasToken && (
            <>
              <li>
                <Link to="/admin" onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
        <Route
          path="/register"
          element={<ProtectedRoute element={<Register />} />}
        />
        <Route
          path="/forget-password"
          element={<ProtectedRoute element={<ForgetPassword />} />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};
