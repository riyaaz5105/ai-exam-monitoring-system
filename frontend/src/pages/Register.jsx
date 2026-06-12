import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await API.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.detail
      );

    }
  };

  return (
  <div className="auth-container">

    <div className="auth-card">

      <h1>Create Account</h1>

      <p>
        Start identifying your learning gaps
        with AI-powered assessments.
      </p>

      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Create Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Create Account
      </button>

      <div className="auth-link">
        Already have an account?{" "}
        <Link to="/">
          Sign In
        </Link>
      </div>

    </div>

  </div>
);
}

export default Register;