import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // =====================================
  // CHECK LOGGED-IN USER
  // =====================================

  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        setUser(null);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Invalid user data in localStorage:",
          error
        );

        localStorage.removeItem("user");
        setUser(null);
      }
    };

    // Initial check
    checkUser();

    // Listen for login/logout
    window.addEventListener(
      "userChanged",
      checkUser
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "userChanged",
        checkUser
      );
    };
  }, []);

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      // =================================
      // REMOVE AUTH DATA
      // =================================

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Old authentication key
      localStorage.removeItem("loggedInUser");

      // =================================
      // REMOVE LATEST RESUME CACHE
      // =================================

      localStorage.removeItem("latestResume");

      // =================================
      // CLEAR USER STATE
      // =================================

      setUser(null);

      // =================================
      // NOTIFY OTHER COMPONENTS
      // =================================

      window.dispatchEvent(
        new Event("userChanged")
      );

      // =================================
      // REDIRECT HOME
      // =================================

      navigate("/", { replace: true });

    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );

      setLoggingOut(false);
    }
  };

  // =====================================
  // GET USER NAME
  // =====================================

  const getUserName = () => {
    if (!user) return "User";

    return (
      user.fullName ||
      user.name ||
      user.username ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  // =====================================
  // GET USER INITIAL
  // =====================================

  const getUserInitial = () => {
    const name = getUserName();

    return name
      .charAt(0)
      .toUpperCase();
  };

  // =====================================
  // NAVBAR
  // =====================================

  return (
    <nav className="navbar">

      {/* =================================
          LOGO
      ================================= */}

      <Link
        to="/"
        className="navbar-logo"
      >
        <span className="logo-icon">
          ✦
        </span>

        <span>
          Resume
          <span className="logo-ai">
            AI
          </span>
        </span>
      </Link>


      {/* =================================
          NAVIGATION LINKS
      ================================= */}

      <div className="navbar-links">

        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "active"
              : ""
          }
        >
          Home
        </Link>


        {user && (
          <Link
            to="/dashboard"
            className={
              location.pathname ===
              "/dashboard"
                ? "active"
                : ""
            }
          >
            Dashboard
          </Link>
        )}


        <Link
          to="/features"
          className={
            location.pathname ===
            "/features"
              ? "active"
              : ""
          }
        >
          Features
        </Link>


        <Link
          to="/how-it-works"
          className={
            location.pathname ===
            "/how-it-works"
              ? "active"
              : ""
          }
        >
          How It Works
        </Link>

      </div>


      {/* =================================
          RIGHT SIDE
      ================================= */}

      <div className="navbar-actions">

        {user ? (

          <div className="navbar-user">

  <span className="navbar-user-name">
    {user.fullName || user.name || "User"}
  </span>

  <button
    type="button"
    className="logout-btn"
    onClick={handleLogout}
    disabled={loggingOut}
  >
    {loggingOut ? (
      "Logging out..."
    ) : (
      <>
        ↪ Logout
      </>
    )}
  </button>

</div>

        ) : (

          <>

            {/* LOGIN */}

            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>


            {/* GET STARTED */}

            <Link
              to="/register"
              className="get-started-btn"
            >
              Get Started
              <span>→</span>
            </Link>

          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;
