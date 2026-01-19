import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../hooks/AuthContext";
import logo from "../assets/code-extreme.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email or username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        login(data.token);          
        navigate("/");              
      } else {
        setErrors({ api: data.message || "Login failed" });
      }
    } catch {
      setErrors({ api: "Server error, try again later" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: 380 }}>
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="rounded-circle shadow"
            style={{ width: 90, height: 90, objectFit: "cover" }}
          />
          <h3 className="fw-bold text-success">Code Extreme</h3>
          <h4 className="fw-bold mt-2">Login</h4>
        </div>

        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Username or Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <div className="text-danger">{errors.password}</div>}

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              name="remember_me"
              checked={formData.remember_me}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          {errors.api && <div className="text-danger">{errors.api}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-2">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold">
              Register
            </Link>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-2">
            <a className="btn btn-outline-danger rounded-circle" href="#"><FaGoogle /></a>
            <a className="btn btn-outline-dark rounded-circle" href="#"><FaGithub /></a>
            <a className="btn btn-outline-primary rounded-circle" href="#"><FaFacebookF /></a>
          </div>
        </form>
      </div>
    </div>
  );
}
