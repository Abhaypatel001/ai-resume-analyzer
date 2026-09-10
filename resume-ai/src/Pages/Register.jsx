import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  // =====================================
  // FORM STATE
  // =====================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // CHECK IF ALREADY LOGGED IN
  // =====================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Remove old errors while typing
    if (error) {
      setError("");
    }

    if (message) {
      setMessage("");
    }
  };

  // =====================================
  // HANDLE TERMS CHECKBOX
  // =====================================

  const handleTermsChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      terms: e.target.checked,
    }));

    setError("");
  };

  // =====================================
  // REGISTER
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // =====================================
    // VALIDATION
    // =====================================

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    if (fullName.length < 2) {
      setError("Full name must contain at least 2 characters.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please create a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      setError("Please accept Terms & Privacy Policy.");
      return;
    }

    // =====================================
    // API REQUEST
    // =====================================

    try {
      setLoading(true);

      console.log("Registering user...");
      console.log("Name:", fullName);
      console.log("Email:", email);

      const response = await axios.post(
        "https://ai-resume-analyzer-backend-9mqo.onrender.com/api/auth/register",
        {
          fullName,
          email,
          password,
        }
      );

      console.log("Register Response:", response.data);

      // =====================================
      // SUCCESS
      // =====================================

      setMessage(
        response.data.message ||
          "Account created successfully!"
      );

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });

      // =====================================
      // REDIRECT TO LOGIN
      // =====================================

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.error("Registration Error:", err);

      // =====================================
      // BACKEND ERROR
      // =====================================

      if (err.response) {
        setError(
          err.response.data?.message ||
            "Registration failed. Please try again."
        );
      } else if (err.request) {
        setError(
          "Unable to connect to server. Please make sure the backend is running."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* =================================
            LEFT SIDE
        ================================= */}

        <div className="auth-info">

          <div className="auth-logo">

            <div className="logo-icon">
              ✦
            </div>

            <span>
              Resume<span>AI</span>
            </span>

          </div>


          <div className="auth-content">

            <span className="auth-badge">
              🚀 Start Your Career Journey
            </span>

            <h1>
              Build Your
              <br />
              <span>Future.</span>
            </h1>

            <p>
              Create your ResumeAI account and get
              intelligent insights to make your resume
              stronger and job-ready.
            </p>

          </div>


          <div className="auth-feature">

            <div>✓</div>

            <span>
              AI-powered resume scoring
            </span>

          </div>


          <div className="auth-feature">

            <div>✓</div>

            <span>
              Smart skill gap analysis
            </span>

          </div>


          <div className="auth-feature">

            <div>✓</div>

            <span>
              Personalized career recommendations
            </span>

          </div>

        </div>


        {/* =================================
            RIGHT SIDE
        ================================= */}

        <div className="login-form-section">

          <div className="form-header">

            <h2>
              Create account
            </h2>

            <p>
              Start improving your resume today
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* =================================
                FULL NAME
            ================================= */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                disabled={loading}
                required
              />

            </div>


            {/* =================================
                EMAIL
            ================================= */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={loading}
                required
              />

            </div>


            {/* =================================
                PASSWORD
            ================================= */}

            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                disabled={loading}
                minLength={6}
                required
              />

              <small>
                Password must be at least 6 characters.
              </small>

            </div>


            {/* =================================
                CONFIRM PASSWORD
            ================================= */}

            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                disabled={loading}
                required
              />

            </div>


            {/* =================================
                TERMS
            ================================= */}

            <div className="remember-row">

              <label>

                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleTermsChange}
                  disabled={loading}
                />

                <span>
                  I agree to the Terms & Privacy Policy
                </span>

              </label>

            </div>


            {/* =================================
                ERROR
            ================================= */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            {/* =================================
                SUCCESS
            ================================= */}

            {message && (
              <div className="auth-success">
                ✓ {message}
              </div>
            )}


            {/* =================================
                REGISTER BUTTON
            ================================= */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span>→</span>
                </>
              )}

            </button>

          </form>


          {/* =================================
              DIVIDER
          ================================= */}

          <div className="divider">
            <span>OR</span>
          </div>


          {/* =================================
              GOOGLE
          ================================= */}

          <button
            type="button"
            className="google-btn"
            onClick={() => {
              alert(
                "Google authentication will be available soon."
              );
            }}
            disabled={loading}
          >

            <span>G</span>

            Continue with Google

          </button>


          {/* =================================
              LOGIN
          ================================= */}

          <p className="register-text">

            Already have an account?

            {" "}

            <Link to="/login">
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;
