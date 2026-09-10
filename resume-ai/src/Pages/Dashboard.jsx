import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        console.log("Token exists:", !!token);

        const response = await axios.get(
          "https://ai-resume-analyzer-backend-9mqo.onrender.com/api/user/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Dashboard Response:", response.data);

        // Save complete dashboard data
        setDashboardData(response.data);

        // Save user
        setUser(response.data.user);

      } catch (error) {
        console.error("Dashboard Error:", error);

        if (error.response) {
          console.error(
            "Status:",
            error.response.status
          );

          console.error(
            "Backend Message:",
            error.response.data
          );
        }

        // Logout only when token is invalid
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>

        <p>Loading Dashboard...</p>
      </div>
    );
  }

  // =====================================================
  // DASHBOARD DATA
  // =====================================================

  // IMPORTANT:
  // Backend sends "statistics", NOT "stats"

  const statistics = dashboardData?.statistics || {};

  const latestResume =
    dashboardData?.latestResume || null;

  const recentResumes =
    dashboardData?.recentResumes || [];

  const hasResume =
    latestResume !== null;

  // =====================================================
  // SCORE STATUS
  // =====================================================

  const getScoreStatus = (score) => {
    if (score >= 80) {
      return "Excellent";
    }

    if (score >= 60) {
      return "Good";
    }

    return "Needs Improvement";
  };

  // =====================================================
  // DASHBOARD UI
  // =====================================================

  return (
    <div className="dashboard-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="dashboard-header">

        <div>

          <span className="dashboard-badge">
            ✦ AI Career Dashboard
          </span>

          <h1>
            Welcome back,{" "}
            {user?.fullName || "User"}! 👋
          </h1>

          <p>
            Analyze your resume, discover skill gaps
            and improve your chances of getting hired.
          </p>

        </div>

        <Link
          to="/upload-resume"
          className="dashboard-upload-btn"
        >
          + Analyze New Resume
        </Link>

      </div>


      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="dashboard-stats">

        {/* RESUMES ANALYZED */}

        <div className="dashboard-stat-card">

          <div className="stat-card-icon">
            📄
          </div>

          <div>

            <span>
              Resumes Analyzed
            </span>

            <strong>
              {statistics.resumesAnalyzed ?? 0}
            </strong>

          </div>

        </div>


        {/* AVERAGE SCORE */}

        <div className="dashboard-stat-card">

          <div className="stat-card-icon">
            🎯
          </div>

          <div>

            <span>
              Average Resume Score
            </span>

            <strong>
              {statistics.averageScore ?? 0}
              <span>/100</span>
            </strong>

          </div>

        </div>


        {/* BEST JOB MATCH */}

        <div className="dashboard-stat-card">

          <div className="stat-card-icon">
            💼
          </div>

          <div>

            <span>
              Best Job Match
            </span>

            <strong>
              {statistics.bestJobMatch ?? 0}%
            </strong>

          </div>

        </div>


        {/* SKILLS */}

        <div className="dashboard-stat-card">

          <div className="stat-card-icon">
            🧠
          </div>

          <div>

            <span>
              Skills Detected
            </span>

            <strong>
              {statistics.skillsDetected ?? 0}
            </strong>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN DASHBOARD
      ================================================= */}

      <div className="dashboard-grid">


        {/* =================================================
            LATEST RESUME SCORE
        ================================================= */}

        <div className="dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <span>
                RESUME PERFORMANCE
              </span>

              <h2>
                Latest Resume Score
              </h2>

            </div>

            <span className="score-status">

              {hasResume
                ? getScoreStatus(
                    Number(latestResume.score) || 0
                  )
                : "No Analysis"}

            </span>

          </div>


          {/* RESUME EXISTS */}

          {hasResume ? (

            <div className="dashboard-score-content">

              {/* SCORE CIRCLE */}

              <div className="big-score-circle">

                <div>

                  <strong>
                    {Number(latestResume.score) || 0}
                  </strong>

                  <span>
                    /100
                  </span>

                </div>

              </div>


              {/* SCORE BREAKDOWN */}

              <div className="score-breakdown">

                {/* ATS */}

                <div className="breakdown-row">

                  <span>
                    ATS Compatibility
                  </span>

                  <strong>
                    {Number(
                      latestResume.atsScore
                    ) || 0}%
                  </strong>

                </div>

                <div className="breakdown-progress">

                  <div
                    style={{
                      width: `${Math.min(
                        Number(
                          latestResume.atsScore
                        ) || 0,
                        100
                      )}%`,
                    }}
                  />

                </div>


                {/* SKILLS */}

                <div className="breakdown-row">

                  <span>
                    Skills
                  </span>

                  <strong>
                    {Number(
                      latestResume.skillsScore
                    ) || 0}%
                  </strong>

                </div>

                <div className="breakdown-progress">

                  <div
                    style={{
                      width: `${Math.min(
                        Number(
                          latestResume.skillsScore
                        ) || 0,
                        100
                      )}%`,
                    }}
                  />

                </div>


                {/* EXPERIENCE */}

                <div className="breakdown-row">

                  <span>
                    Experience
                  </span>

                  <strong>
                    {Number(
                      latestResume.experienceScore
                    ) || 0}%
                  </strong>

                </div>

                <div className="breakdown-progress">

                  <div
                    style={{
                      width: `${Math.min(
                        Number(
                          latestResume.experienceScore
                        ) || 0,
                        100
                      )}%`,
                    }}
                  />

                </div>


                {/* PROJECTS */}

                <div className="breakdown-row">

                  <span>
                    Projects
                  </span>

                  <strong>
                    {Number(
                      latestResume.projectsScore
                    ) || 0}%
                  </strong>

                </div>

                <div className="breakdown-progress">

                  <div
                    style={{
                      width: `${Math.min(
                        Number(
                          latestResume.projectsScore
                        ) || 0,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          ) : (

            /* NO RESUME */

            <div className="empty-dashboard">

              <p>
                You haven't analyzed a resume yet.
              </p>

              <Link
                to="/upload-resume"
                className="view-analysis-btn"
              >
                Analyze Your Resume →
              </Link>

            </div>

          )}

        </div>


        {/* =================================================
            SKILL GAP ANALYSIS
        ================================================= */}

        <div className="dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <span>
                AI INSIGHTS
              </span>

              <h2>
                Skill Gap Analysis
              </h2>

            </div>

            <div className="insight-icon">
              🎯
            </div>

          </div>


          <p className="skill-gap-description">

            {hasResume
              ? "AI found some skills that could improve your profile for the selected job role."
              : "Analyze your resume to discover your skill gaps."}

          </p>


          {/* SKILL GAPS */}

          <div className="dashboard-skills">

            {hasResume &&
            Array.isArray(
              latestResume.skillGaps
            ) &&
            latestResume.skillGaps.length > 0 ? (

              latestResume.skillGaps
                .slice(0, 5)
                .map((skill, index) => (

                  <span key={`${skill}-${index}`}>
                    {skill}
                  </span>

                ))

            ) : (

              <span>
                No skill gaps available
              </span>

            )}

          </div>


          {/* VIEW ANALYSIS */}

          {hasResume &&
          (latestResume._id || latestResume.id) && (

            <Link
              to={`/analysis/${
                latestResume._id || latestResume.id
              }`}
              className="view-analysis-btn"
            >
              View Full Analysis →
            </Link>

          )}

        </div>

      </div>


      {/* =================================================
          RECENT ANALYSIS
      ================================================= */}

      <div className="dashboard-card recent-card">

        <div className="dashboard-card-header">

          <div>

            <span>
              HISTORY
            </span>

            <h2>
              Recent Resume Analysis
            </h2>

          </div>

          <span className="history-link">

            {recentResumes.length} Resume
            {recentResumes.length !== 1
              ? "s"
              : ""}

          </span>

        </div>


        <div className="analysis-history">

          {/* RESUME HISTORY */}

          {recentResumes.length > 0 ? (

            recentResumes.map((resume) => {

              const resumeId =
                resume._id || resume.id;

              return (
                <div
                  className="history-row"
                  key={resumeId}
                >

                  {/* FILE */}

                  <div className="history-file">

                    <div className="file-icon">
                      📄
                    </div>

                    <div>

                      <strong>
                        {resume.fileName ||
                          "Resume.pdf"}
                      </strong>

                      <span>

                        {resume.createdAt
                          ? new Date(
                              resume.createdAt
                            ).toLocaleDateString()
                          : "Recently"}

                      </span>

                    </div>

                  </div>


                  {/* SCORE */}

                  <div className="history-score">

                    <strong>
                      {Number(
                        resume.score
                      ) || 0}
                    </strong>

                    <span>
                      /100
                    </span>

                  </div>


                  {/* STATUS */}

                  <span
                    className={`history-status ${
                      (Number(
                        resume.score
                      ) || 0) < 60
                        ? "average"
                        : ""
                    }`}
                  >

                    {getScoreStatus(
                      Number(
                        resume.score
                      ) || 0
                    )}

                  </span>


                  {/* VIEW */}

                  {resumeId && (

                    <Link
                      to={`/analysis/${resumeId}`}
                      className="history-view"
                    >
                      View →
                    </Link>

                  )}

                </div>
              );

            })

          ) : (

            /* NO HISTORY */

            <div className="empty-dashboard">

              <p>
                No resume analysis history found.
              </p>

              <Link
                to="/upload-resume"
                className="view-analysis-btn"
              >
                Analyze Resume →
              </Link>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
