import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Analysis() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH ANALYSIS
  // =====================================================

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        if (!id) {
          setError("Resume ID not found.");
          setLoading(false);
          return;
        }

        console.log("Fetching Resume Analysis:", id);

        // IMPORTANT:
        // Backend route = GET /api/resume/:id
        const response = await fetch(
          `https://ai-resume-analyzer-backend-9mqo.onrender.com/api/resume/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("Analysis Response:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load analysis."
          );
        }

        if (!data.resume) {
          throw new Error("Resume analysis data not found.");
        }

        setResume(data.resume);

      } catch (error) {
        console.error("Analysis Error:", error);

        setError(
          error.message || "Failed to load resume analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id, navigate]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="analysis-page">
        <div className="analysis-container">
          <div className="analysis-card analysis-loading-card">

            <div className="analysis-loader"></div>

            <h2>Loading Your Analysis...</h2>

            <p>
              Please wait while we load your
              AI-powered resume analysis.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="analysis-page">
        <div className="analysis-container">

          <div className="analysis-card analysis-error-card">

            <div className="error-icon">
              ⚠️
            </div>

            <h2>
              Unable to Load Analysis
            </h2>

            <p>{error}</p>

            <div className="error-actions">

              <button
                className="analyze-resume-btn"
                onClick={() =>
                  navigate("/upload-resume")
                }
              >
                Analyze New Resume →
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                ← Dashboard
              </button>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // NO RESUME
  // =====================================================

  if (!resume) {
    return (
      <div className="analysis-page">
        <div className="analysis-container">

          <div className="analysis-card">

            <div className="error-icon">
              📄
            </div>

            <h2>
              No Analysis Found
            </h2>

            <p>
              We couldn't find the requested resume analysis.
            </p>

            <button
              className="analyze-resume-btn"
              onClick={() =>
                navigate("/upload-resume")
              }
            >
              Analyze Resume →
            </button>

          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // SAFE VALUES
  // =====================================================

  const overallScore = Number(resume.score) || 0;
  const atsScore = Number(resume.atsScore) || 0;
  const skillsScore = Number(resume.skillsScore) || 0;
  const experienceScore =
    Number(resume.experienceScore) || 0;
  const projectsScore =
    Number(resume.projectsScore) || 0;

  const skills = Array.isArray(resume.skills)
    ? resume.skills
    : [];

  const skillGaps = Array.isArray(resume.skillGaps)
    ? resume.skillGaps
    : [];

  const recommendations =
    Array.isArray(resume.recommendations)
      ? resume.recommendations
      : [];

  // =====================================================
  // JOB MATCH
  // =====================================================

  let jobMatchScore = 0;
  let matchedSkills = [];
  let missingSkills = [];

  if (
    typeof resume.jobMatch === "object" &&
    resume.jobMatch !== null
  ) {
    jobMatchScore =
      Number(resume.jobMatch.score) || 0;

    matchedSkills = Array.isArray(
      resume.jobMatch.matchedSkills
    )
      ? resume.jobMatch.matchedSkills
      : [];

    missingSkills = Array.isArray(
      resume.jobMatch.missingSkills
    )
      ? resume.jobMatch.missingSkills
      : [];
  } else {
    jobMatchScore =
      Number(resume.jobMatch) || 0;
  }

  // =====================================================
  // SCORE STATUS
  // =====================================================

  const getScoreStatus = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";

    return "Needs Improvement";
  };

  const scoreStatus =
    getScoreStatus(overallScore);

  // =====================================================
  // PRIORITY
  // =====================================================

  const getPriorityClass = (priority) => {
    const value = String(priority || "")
      .toLowerCase();

    if (value.includes("high")) {
      return "priority-high";
    }

    if (value.includes("medium")) {
      return "priority-medium";
    }

    return "priority-low";
  };

  // =====================================================
  // SCORE BAR
  // =====================================================

  const scoreWidth = (score) =>
    `${Math.min(Math.max(Number(score) || 0, 0), 100)}%`;

  // =====================================================
  // PRINT REPORT
  // =====================================================

  const handleDownloadReport = () => {
    window.print();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="analysis-page">

      <div className="analysis-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="analysis-header">

          <div className="analysis-header-content">

            <span className="analysis-badge">
              ✦ AI ANALYSIS COMPLETE
            </span>

            <h1>
              Your Resume{" "}
              <span>Analysis</span>
            </h1>

            <p>
              Here's how your resume performs and what
              you can improve to increase your chances
              of getting hired.
            </p>

          </div>

          <div className="analysis-header-actions">

            <button
              className="download-report-btn"
              onClick={handleDownloadReport}
            >
              ↓ Download Report
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              ← Dashboard
            </button>

          </div>

        </div>


        {/* =================================================
            RESUME INFO
        ================================================= */}

        <div className="resume-analysis-info">

          <div className="resume-info-item">

            <span>RESUME</span>

            <strong>
              {resume.fileName || "Resume.pdf"}
            </strong>

          </div>

          <div className="resume-info-item">

            <span>TARGET ROLE</span>

            <strong>
              {resume.jobRole || "Not specified"}
            </strong>

          </div>

          <div className="resume-info-item">

            <span>STATUS</span>

            <strong className="analysis-completed">
              ✓ {resume.analysisStatus || "Completed"}
            </strong>

          </div>

        </div>


        {/* =================================================
            TOP SCORE
        ================================================= */}

        <div className="analysis-top-grid">

          {/* OVERALL SCORE */}

          <div className="analysis-card overall-score-card">

            <span className="analysis-label">
              OVERALL RESUME SCORE
            </span>

            <div className="overall-score">

              <strong>
                {overallScore}
              </strong>

              <span>
                /100
              </span>

            </div>

            <div className="score-rating">
              ✓ {scoreStatus} Resume
            </div>

            <p>
              {resume.summary ||
                "AI has analyzed your resume based on the selected job role."}
            </p>

          </div>


          {/* BREAKDOWN */}

          <div className="analysis-card">

            <div className="analysis-card-title">

              <div>

                <span className="analysis-label">
                  PERFORMANCE
                </span>

                <h2>
                  Resume Breakdown
                </h2>

              </div>

              <span className="small-check">
                ✓
              </span>

            </div>


            <div className="analysis-metrics">

              {/* ATS */}

              <div className="metric">

                <div>
                  <span>
                    ATS Compatibility
                  </span>

                  <strong>
                    {atsScore}%
                  </strong>
                </div>

                <div className="metric-bar">
                  <div
                    style={{
                      width: scoreWidth(atsScore),
                    }}
                  />
                </div>

              </div>


              {/* SKILLS */}

              <div className="metric">

                <div>
                  <span>
                    Skills
                  </span>

                  <strong>
                    {skillsScore}%
                  </strong>
                </div>

                <div className="metric-bar">
                  <div
                    style={{
                      width: scoreWidth(skillsScore),
                    }}
                  />
                </div>

              </div>


              {/* EXPERIENCE */}

              <div className="metric">

                <div>
                  <span>
                    Experience
                  </span>

                  <strong>
                    {experienceScore}%
                  </strong>
                </div>

                <div className="metric-bar">
                  <div
                    style={{
                      width: scoreWidth(experienceScore),
                    }}
                  />
                </div>

              </div>


              {/* PROJECTS */}

              <div className="metric">

                <div>
                  <span>
                    Projects
                  </span>

                  <strong>
                    {projectsScore}%
                  </strong>
                </div>

                <div className="metric-bar">
                  <div
                    style={{
                      width: scoreWidth(projectsScore),
                    }}
                  />
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            DETECTED SKILLS
        ================================================= */}

        <div className="analysis-card">

          <div className="analysis-card-title">

            <div>

              <span className="analysis-label">
                RESUME SKILLS
              </span>

              <h2>
                Skills Detected by AI
              </h2>

            </div>

            <div className="analysis-title-icon">
              🧠
            </div>

          </div>


          {skills.length > 0 ? (

            <div className="analysis-skill-grid">

              {skills.map((skill, index) => (

                <div
                  className="skill-gap-item detected-skill"
                  key={`${skill}-${index}`}
                >

                  <strong>
                    {skill}
                  </strong>

                  <span>
                    ✓ Detected
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <div className="analysis-empty">
              No specific skills were detected.
            </div>

          )}

        </div>


        {/* =================================================
            SKILL GAP
        ================================================= */}

        <div className="analysis-card">

          <div className="analysis-card-title">

            <div>

              <span className="analysis-label">
                AI INSIGHTS
              </span>

              <h2>
                Skill Gap Analysis
              </h2>

            </div>

            <div className="analysis-title-icon">
              🎯
            </div>

          </div>

          <p className="analysis-description">
            These skills may improve your profile
            for the selected target role.
          </p>


          {skillGaps.length > 0 ? (

            <div className="analysis-skill-grid">

              {skillGaps.map((gap, index) => {

                if (
                  typeof gap === "object" &&
                  gap !== null
                ) {

                  return (
                    <div
                      className="skill-gap-item"
                      key={`${gap.skill || "gap"}-${index}`}
                    >

                      <strong>
                        {gap.skill || "Recommended Skill"}
                      </strong>

                      <span
                        className={getPriorityClass(
                          gap.priority
                        )}
                      >
                        {gap.priority || "Recommended"}
                      </span>

                    </div>
                  );
                }

                const parts =
                  String(gap).split(" - ");

                return (
                  <div
                    className="skill-gap-item"
                    key={`gap-${index}`}
                  >

                    <strong>
                      {parts[0]}
                    </strong>

                    <span>
                      {parts[1] || "Recommended"}
                    </span>

                  </div>
                );

              })}

            </div>

          ) : (

            <div className="analysis-empty">
              🎉 No major skill gaps detected.
            </div>

          )}

        </div>


        {/* =================================================
            JOB MATCH
        ================================================= */}

        <div className="analysis-card">

          <div className="analysis-card-title">

            <div>

              <span className="analysis-label">
                CAREER INSIGHTS
              </span>

              <h2>
                Job Match
              </h2>

            </div>

            <div className="analysis-title-icon">
              💼
            </div>

          </div>


          <div className="job-match-main">

            <div className="job-match-score-circle">

              <strong>
                {jobMatchScore}
              </strong>

              <span>
                /100
              </span>

            </div>


            <div className="job-match-content">

              <span className="analysis-label">
                TARGET ROLE
              </span>

              <h3>
                {resume.jobRole || "Target Job"}
              </h3>

              <p>
                Your resume has a{" "}
                <strong>
                  {jobMatchScore}%
                </strong>{" "}
                match with this role based on
                your skills and resume content.
              </p>

            </div>

          </div>


          {matchedSkills.length > 0 && (

            <div className="job-match-skills">

              <h3>
                ✓ Matched Skills
              </h3>

              <div className="skill-tags">

                {matchedSkills.map(
                  (skill, index) => (
                    <span
                      key={`matched-${skill}-${index}`}
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            </div>

          )}


          {missingSkills.length > 0 && (

            <div className="job-match-skills missing">

              <h3>
                ⚠ Missing Skills
              </h3>

              <div className="skill-tags">

                {missingSkills.map(
                  (skill, index) => (
                    <span
                      key={`missing-${skill}-${index}`}
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            </div>

          )}

        </div>


        {/* =================================================
            RECOMMENDATIONS
        ================================================= */}

        <div className="analysis-card">

          <div className="analysis-card-title">

            <div>

              <span className="analysis-label">
                AI RECOMMENDATIONS
              </span>

              <h2>
                How You Can Improve
              </h2>

            </div>

            <div className="analysis-title-icon">
              ✨
            </div>

          </div>


          {recommendations.length > 0 ? (

            <div className="recommendations">

              {recommendations.map(
                (recommendation, index) => {

                  if (
                    typeof recommendation === "object" &&
                    recommendation !== null
                  ) {

                    return (
                      <div
                        className="recommendation"
                        key={
                          recommendation.title ||
                          `recommendation-${index}`
                        }
                      >

                        <div className="recommendation-number">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </div>

                        <div>

                          <h3>
                            {recommendation.title ||
                              "Recommendation"}
                          </h3>

                          <p>
                            {recommendation.description ||
                              "No additional details available."}
                          </p>

                        </div>

                      </div>
                    );
                  }

                  const parts =
                    String(recommendation).split(": ");

                  return (
                    <div
                      className="recommendation"
                      key={`recommendation-${index}`}
                    >

                      <div className="recommendation-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div>

                        <h3>
                          {parts[0]}
                        </h3>

                        <p>
                          {parts.slice(1).join(": ") ||
                            "No additional details available."}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          ) : (

            <div className="analysis-empty">
              No recommendations available.
            </div>

          )}

        </div>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="analysis-card">

          <div className="analysis-card-title">

            <div>

              <span className="analysis-label">
                AI SUMMARY
              </span>

              <h2>
                Resume Summary
              </h2>

            </div>

            <div className="analysis-title-icon">
              🤖
            </div>

          </div>

          <div className="summary-box">

            <p>
              {resume.summary ||
                "No summary available."}
            </p>

          </div>

        </div>


        {/* =================================================
            BOTTOM ACTIONS
        ================================================= */}

        <div className="analysis-bottom-actions">

          <button
            className="secondary-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <button
            className="analyze-resume-btn"
            onClick={() =>
              navigate("/upload-resume")
            }
          >
            Analyze Another Resume →
          </button>

        </div>

      </div>

    </div>
  );
}

export default Analysis;
