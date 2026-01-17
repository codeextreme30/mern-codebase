
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa";
import logo from "../assets/code-extreme.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });

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
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email !== formData.confirmEmail)
      newErrors.confirmEmail = "Emails do not match";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.accept) newErrors.accept = "You must accept the privacy policy";
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
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); 
      } else {
        setErrors(data.errors || { api: data.message || "Registration failed" });
      }
    } catch (err) {
      setErrors({ api: "Server error, try again later" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "700px" }}>
        <div className="text-center mb-4">
          <img src={logo} alt="logo" className="rounded-circle shadow" style={{ width: 90, height: 90, objectFit: "cover" }} />
          <h3 className="fw-bold text-success">Code Extreme</h3>
          <h4 className="fw-bold mt-2">Register</h4>
        </div>

        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div className="d-flex gap-2">
            <div className="w-100">
              <input
                type="text"
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </div>
            <div className="w-100">
              <input
                type="text"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </div>
          </div>

          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}

          <input
            type="email"
            className={`form-control ${errors.confirmEmail ? "is-invalid" : ""}`}
            placeholder="Confirm Email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
          />
          {errors.confirmEmail && <div className="text-danger">{errors.confirmEmail}</div>}

          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}

          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="accept"
              name="accept"
              checked={formData.accept}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="accept">
              Read and accept privacy policy
            </label>
            {errors.accept && <div className="text-danger">{errors.accept}</div>}
          </div>

          {errors.api && <div className="text-danger">{errors.api}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center mt-2">
            Already have an account? <Link to="/login" className="text-primary fw-semibold">Login</Link>
          </div>

          {/* Social login */}
          <div className="d-flex justify-content-center gap-3 mt-2">
            <a href="https://accounts.google.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
              <FaGoogle />
            </a>
            <a href="https://github.com/login" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
              <FaGithub />
            </a>
            <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
              <FaFacebookF />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
