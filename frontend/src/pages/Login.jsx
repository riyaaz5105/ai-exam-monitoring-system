import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      navigate("/dashboard");

    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">

      <h1>Welcome Back</h1>

      <p>
        Sign in to continue your AI-powered
        learning journey.
      </p>

      <input
        type="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Sign In
      </button>

      <div className="auth-link">
        Don't have an account?{" "}
        <Link to="/register">
          Create Account
        </Link>
      </div>

    </div>
  </div>
);
}

export default Login;