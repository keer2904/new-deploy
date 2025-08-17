import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import "./admin_L.css"; 
import API_BASE_URL from "../../services/apiConfig";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AdminAuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/admin/login`, {
        email,
        password,
      });

      console.log("Login success:", res.data);
      login(res.data);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form className="admin-login-form" onSubmit={handleLogin}>
      <div className="form-inner-content">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Not registered?{" "}
          <Link to="/admin/register">Create Account</Link>
        </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
