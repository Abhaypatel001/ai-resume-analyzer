import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // ==========================================
  // ANALYZE RESUME
  // ==========================================

  const handleAnalyzeResume = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/upload-resume");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-page">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <Navbar />

      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <section className="hero-section">

        {/* Background */}
        <div className="hero-background"></div>

        <div className="hero-orb hero-orb-one"></div>
        <div className="hero-orb hero-orb-two"></div>


        <div className="hero-container">

          {/* ========================================
              LEFT HERO CONTENT
          ======================================== */}

          <div className="hero-content">

            {/* Badge */}

            <div className="hero-badge">
              <span>✦</span>
              <span>AI-Powered Resume Analysis</span>
            </div>


            {/* Heading */}

            <h1>
              Build a Resume
              <br />
              That <span>Gets Noticed.</span>
            </h1>


            {/* Description */}

            <p className="hero-description">
              Analyze your resume with AI, discover skill gaps,
              improve your content, and match your resume with
              your dream job.
            </p>


            {/* Buttons */}

            <div className="hero-buttons">

              <button
                type="button"
                className="hero-primary-btn"
                onClick={handleAnalyzeResume}
              >
                <span>✦</span>

                <span>Analyze My Resume</span>

                <span className="hero-arrow">
                  →
                </span>
              </button>


              <a
                href="#how-it-works"
                className="secondary-btn"
              >
                <span>▶</span>

                <span>See How It Works</span>
              </a>

            </div>


            {/* ========================================
                HERO STATS
            ======================================== */}

            <div className="hero-stats">

              {/* STAT 1 */}

              <div className="stat">

                <div className="stat-icon">
                  ✦
                </div>

                <div className="stat-content">
                  <strong>AI</strong>

                  <span>
                    Powered Analysis
                  </span>
                </div>

              </div>


              {/* STAT 2 */}

              <div className="stat">

                <div className="stat-icon">
                  💡
                </div>

                <div className="stat-content">
                  <strong>100+</strong>

                  <span>
                    Resume Insights
                  </span>
                </div>

              </div>


              {/* STAT 3 */}

              <div className="stat">

                <div className="stat-icon">
                  🎯
                </div>

                <div className="stat-content">
                  <strong>24/7</strong>

                  <span>
                    Career Assistant
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* ==========================================
              RIGHT SIDE — RESUME ANALYSIS CARD
          ========================================== */}

          <div className="resume-preview">

            <div className="preview-glow"></div>


            <div className="analysis-card">

              {/* ========================================
                  CARD HEADER
              ======================================== */}

              <div className="card-header">

                <div className="analysis-heading">

                  <div className="analysis-card-icon">
                    📄
                  </div>

                  <div>

                    <span className="small-label">
                      AI ANALYSIS
                    </span>

                    <h3>
                      Resume Overview
                    </h3>

                  </div>

                </div>


                <div className="check-icon">
                  ✓
                </div>

              </div>


              {/* ========================================
                  SCORE SECTION
              ======================================== */}

              <div className="score-section">

                {/* SCORE CIRCLE */}

                <div className="score-circle">

                  <div className="score-circle-inner">

                    <strong>
                      87
                    </strong>

                    <span>
                      /100
                    </span>

                    <small>
                      Overall
                      <br />
                      Score
                    </small>

                  </div>

                </div>


                {/* SCORE INFORMATION */}

                <div className="score-info">

                  <h4>
                    ✓ Great Resume!
                  </h4>

                  <p>
                    Your resume is stronger than most
                    resumes analyzed.
                  </p>

                </div>

              </div>


              {/* ========================================
                  ANALYSIS METRICS
              ======================================== */}

              <div className="analysis-list">

                {/* ATS */}

                <div className="analysis-row">

                  <div className="analysis-row-content">

                    <div className="analysis-row-title">

                      <span className="metric-icon">
                        ◈
                      </span>

                      <span>
                        ATS Compatibility
                      </span>

                    </div>


                    <div className="progress">

                      <div
                        style={{
                          width: "92%"
                        }}
                      ></div>

                    </div>

                  </div>


                  <strong>
                    92%
                  </strong>

                </div>


                {/* SKILLS */}

                <div className="analysis-row">

                  <div className="analysis-row-content">

                    <div className="analysis-row-title">

                      <span className="metric-icon">
                        ♢
                      </span>

                      <span>
                        Skills
                      </span>

                    </div>


                    <div className="progress">

                      <div
                        style={{
                          width: "85%"
                        }}
                      ></div>

                    </div>

                  </div>


                  <strong>
                    85%
                  </strong>

                </div>


                {/* EXPERIENCE */}

                <div className="analysis-row">

                  <div className="analysis-row-content">

                    <div className="analysis-row-title">

                      <span className="metric-icon">
                        ♙
                      </span>

                      <span>
                        Experience
                      </span>

                    </div>


                    <div className="progress">

                      <div
                        style={{
                          width: "81%"
                        }}
                      ></div>

                    </div>

                  </div>


                  <strong>
                    81%
                  </strong>

                </div>


                {/* PROJECTS */}

                <div className="analysis-row">

                  <div className="analysis-row-content">

                    <div className="analysis-row-title">

                      <span className="metric-icon">
                        ◇
                      </span>

                      <span>
                        Projects
                      </span>

                    </div>


                    <div className="progress">

                      <div
                        style={{
                          width: "90%"
                        }}
                      ></div>

                    </div>

                  </div>


                  <strong>
                    90%
                  </strong>

                </div>

              </div>


              {/* ========================================
                  SKILL GAP
              ======================================== */}

              <div className="skills-box">

                <div className="skills-title">

                  <span>
                    ⚠
                  </span>

                  <span>
                    Skill Gap Detected
                  </span>

                </div>


                <div className="skill-tags">

                  <span>
                    TypeScript
                  </span>

                  <span>
                    Docker
                  </span>

                  <span>
                    AWS
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          FEATURES SECTION
      ========================================== */}

      <section
        className="features-section"
        id="features"
      >

        <div className="section-heading">

          <span>
            POWERFUL FEATURES
          </span>

          <h2>
            Everything You Need to
            <br />
            <span>
              Improve Your Resume
            </span>
          </h2>

          <p>
            Get intelligent insights and actionable
            recommendations powered by AI.
          </p>

        </div>


        {/* FEATURES GRID */}

        <div className="features-grid">

          {/* FEATURE 1 */}

          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Resume Scoring
            </h3>

            <p>
              Get an AI-powered score for your resume
              across multiple categories.
            </p>

          </div>


          {/* FEATURE 2 */}

          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Skill Gap Analysis
            </h3>

            <p>
              Discover missing skills based on your
              desired career role.
            </p>

          </div>


          {/* FEATURE 3 */}

          <div className="feature-card">

            <div className="feature-icon">
              💼
            </div>

            <h3>
              Job Matching
            </h3>

            <p>
              Compare your resume with job descriptions
              and discover your match percentage.
            </p>

          </div>


          {/* FEATURE 4 */}

          <div className="feature-card">

            <div className="feature-icon">
              ✨
            </div>

            <h3>
              AI Suggestions
            </h3>

            <p>
              Get personalized recommendations to
              improve your resume.
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          HOW IT WORKS
      ========================================== */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-heading">

          <span>
            HOW IT WORKS
          </span>

          <h2>
            Analyze Your Resume in
            <br />
            <span>
              Three Simple Steps
            </span>
          </h2>

        </div>


        {/* STEPS */}

        <div className="steps">

          {/* STEP 1 */}

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Upload Resume
            </h3>

            <p>
              Upload your PDF or DOCX resume securely.
            </p>

          </div>


          {/* STEP 2 */}

          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              AI Analysis
            </h3>

            <p>
              Our AI analyzes your resume and identifies
              strengths and improvement areas.
            </p>

          </div>


          {/* STEP 3 */}

          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Get Insights
            </h3>

            <p>
              Receive your score, skill gaps and
              personalized recommendations.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;