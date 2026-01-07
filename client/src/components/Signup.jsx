import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      
      const res = await axios.post(
    "http://localhost:6969/api/signup",
    formData
  );
      localStorage.setItem("token", res.data.token);
      
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">

        
        <div className="login-left">
          <img src="/yellow-dog.jpg" alt="Dog" />
          <h2>Welcome to PetVet</h2>
          <p>Create your account to get started</p>
        </div>

        
        <div className="login-right">
          <div className="form-center">
            <h1>REGISTER</h1>

            {error && <div className="error-msg">{error}</div>}

            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="client">Client</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>

              <input
                type="number"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />

              <button type="submit" disabled={loading}>
                {loading ? <div className="spinner"></div> : "Sign Up"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
