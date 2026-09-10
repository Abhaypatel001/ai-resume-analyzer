import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
    // Already logged-in user ko dashboard par bhejo
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==============================
    // VALIDATION
    // ==============================

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // LOGIN API
      // ==============================

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response.data);

      // ==============================
      // SAVE JWT TOKEN
      // ==============================

      localStorage.setItem(
        "token",
        response.data.token
      );

      // ==============================
      // SAVE USER DATA
      // ==============================

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // ==============================
      // REMEMBER ME
      // ==============================

      if (rememberMe) {
        localStorage.setItem(
          "rememberMe",
          "true"
        );
      } else {
        localStorage.removeItem(
          "rememberMe"
        );
      }

      // ==============================
      // IMPORTANT
      // NAVBAR KO USER LOGIN BATANA
      // ==============================

      window.dispatchEvent(
        new Event("userChanged")
      );

      // ==============================
      // DASHBOARD
      // ==============================

      navigate("/dashboard");

    } catch (err) {
      console.error("Login Error:", err);

      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* ==============================
            LEFT SIDE
        ============================== */}

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
              ✨ AI-Powered Career Platform
            </span>

            <h1>
              Welcome
              <br />
              <span>Back!</span>
            </h1>

            <p>
              Continue your journey with ResumeAI and
              build a resume that gets noticed.
            </p>

          </div>


          <div className="auth-feature">
            <div>✓</div>
            <span>
              AI-powered resume analysis
            </span>
          </div>

          <div className="auth-feature">
            <div>✓</div>
            <span>
              Personalized career insights
            </span>
          </div>

          <div className="auth-feature">
            <div>✓</div>
            <span>
              Smart skill gap detection
            </span>
          </div>

        </div>


        {/* ==============================
            RIGHT SIDE
        ============================== */}

        <div className="login-form-section">

          <div className="form-header">

            <h2>
              Sign in
            </h2>

            <p>
              Enter your details to access your account
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <div className="password-label">

                <label>
                  Password
                </label>

                <a
                  href="#"
                  onClick={(e) =>
                    e.preventDefault()
                  }
                >
                  Forgot password?
                </a>

              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            {/* REMEMBER ME */}

            <div className="remember-row">

              <label>

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />

                Remember me

              </label>

            </div>


            {/* ERROR */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >

              {loading
                ? "Signing In..."
                : "Sign In"}

              {!loading && (
                <span>→</span>
              )}

            </button>

          </form>


          {/* DIVIDER */}

          <div className="divider">
            <span>OR</span>
          </div>


          {/* GOOGLE */}

          <button
            type="button"
            className="google-btn"
          >
            <span>G</span>
            Continue with Google
          </button>


          {/* REGISTER */}

          <p className="register-text">

            Don't have an account?

            {" "}

            <Link to="/register">
              Create an account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
