import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { isAuthenticated, register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
    setServerError("");
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getErrorMessage = (error) => {
    const data = error.response?.data;

    if (!data) {
      return "Registration failed. Please try again.";
    }

    if (typeof data === "string") {
      return data;
    }

    const firstField = Object.keys(data)[0];
    const firstError = data[firstField];

    if (Array.isArray(firstError)) {
      return firstError[0];
    }

    return data.detail || "Registration failed. Please check your details.";
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      navigate("/login", {
        replace: true,
        state: { message: "Account created. Please login." },
      });
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={pageStyle}>
      <form onSubmit={handleRegister} style={formStyle} noValidate>
        <h1 style={titleStyle}>Create Account</h1>

        {serverError && <p style={errorBoxStyle}>{serverError}</p>}

        <label style={labelStyle}>
          Full Name
          <input
            autoComplete="name"
            name="name"
            onChange={handleChange}
            placeholder="Your full name"
            style={inputStyle}
            value={form.name}
          />
          {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
        </label>

        <label style={labelStyle}>
          Email
          <input
            autoComplete="email"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            style={inputStyle}
            type="email"
            value={form.email}
          />
          {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
        </label>

        <label style={labelStyle}>
          Phone Number
          <input
            autoComplete="tel"
            inputMode="numeric"
            name="phone"
            onChange={handleChange}
            placeholder="9876543210"
            style={inputStyle}
            value={form.phone}
          />
          {errors.phone && <span style={errorTextStyle}>{errors.phone}</span>}
        </label>

        <label style={labelStyle}>
          Password
          <input
            autoComplete="new-password"
            name="password"
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            style={inputStyle}
            type="password"
            value={form.password}
          />
          {errors.password && (
            <span style={errorTextStyle}>{errors.password}</span>
          )}
        </label>

        <label style={labelStyle}>
          Confirm Password
          <input
            autoComplete="new-password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Re-enter password"
            style={inputStyle}
            type="password"
            value={form.confirmPassword}
          />
          {errors.confirmPassword && (
            <span style={errorTextStyle}>{errors.confirmPassword}</span>
          )}
        </label>

        <button disabled={submitting} style={buttonStyle} type="submit">
          {submitting ? "Creating..." : "Create Account"}
        </button>

        <p style={footerTextStyle}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

const pageStyle = {
  alignItems: "center",
  background: "#f5f5f5",
  display: "flex",
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "24px",
};

const formStyle = {
  background: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 8px 26px rgba(15, 23, 42, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  maxWidth: "460px",
  padding: "30px",
  width: "100%",
};

const titleStyle = {
  color: "#1f2933",
  fontSize: "30px",
  margin: "0 0 4px",
};

const labelStyle = {
  color: "#1f2933",
  display: "grid",
  fontWeight: 800,
  gap: "7px",
};

const inputStyle = {
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "15px",
  padding: "12px",
};

const buttonStyle = {
  background: "#fc8019",
  border: "none",
  borderRadius: "6px",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 900,
  padding: "12px",
};

const errorBoxStyle = {
  background: "#fff1f2",
  border: "1px solid #fecdd3",
  borderRadius: "6px",
  color: "#be123c",
  fontWeight: 700,
  margin: 0,
  padding: "10px 12px",
};

const errorTextStyle = {
  color: "#be123c",
  fontSize: "13px",
  fontWeight: 700,
};

const footerTextStyle = {
  color: "#4b5563",
  margin: "4px 0 0",
  textAlign: "center",
};

export default Register;
