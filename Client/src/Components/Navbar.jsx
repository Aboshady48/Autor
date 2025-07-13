import { Link , Routes , Route } from "react-router-dom"
import { Register } from "../Auth/Register"

export const Navbar = () => {
  return (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>

        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/register" element={<Register/>} />
        </Routes>

    </div>
  )
}
