import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const from = location.state?.from?.pathname || "/";
  const successMessage = location.state?.message || "";

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
    setServerError("");
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getErrorMessage = (error) => {
    const data = error.response?.data;

    if (typeof data === "string") {
      return data;
    }

    if (data?.non_field_errors?.length) {
      return data.non_field_errors[0];
    }

    if (data?.detail) {
      return data.detail;
    }

    return "Login failed. Please check your email and password.";
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      await login({
        email: form.email.trim(),
        password: form.password,
      });
      navigate(from, { replace: true });
    } catch (error) {
      setServerError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={pageStyle}>
      <form onSubmit={handleLogin} style={formStyle} noValidate>
        <h1 style={titleStyle}>Login</h1>

        {successMessage && <p style={successBoxStyle}>{successMessage}</p>}
        {serverError && <p style={errorBoxStyle}>{serverError}</p>}

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
          Password
          <input
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            style={inputStyle}
            type="password"
            value={form.password}
          />
          {errors.password && (
            <span style={errorTextStyle}>{errors.password}</span>
          )}
        </label>

        <button disabled={submitting} style={buttonStyle} type="submit">
          {submitting ? "Logging in..." : "Login"}
        </button>

        <p style={footerTextStyle}>
          Do not have an account? <Link to="/register">Create Account</Link>
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
  maxWidth: "420px",
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

const successBoxStyle = {
  background: "#ecfdf5",
  border: "1px solid #bbf7d0",
  borderRadius: "6px",
  color: "#047857",
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

export default Login;
