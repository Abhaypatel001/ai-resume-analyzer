function HowItWorks() {
  return (
    <div className="info-page">

      <div className="info-hero">
        <span className="info-badge">✦ SIMPLE & SMART</span>

        <h1>
          How ResumeAI
          <span> Works.</span>
        </h1>

        <p>
          Analyze your resume in just a few simple steps and
          get personalized AI-powered career insights.
        </p>
      </div>

      <div className="steps-container">

        <div className="step-card">
          <div className="step-number">01</div>

          <div>
            <h2>Upload Your Resume</h2>
            <p>
              Upload your resume in PDF or DOCX format and
              provide your target job role.
            </p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">02</div>

          <div>
            <h2>AI Analyzes Your Resume</h2>
            <p>
              Our AI evaluates your resume, skills,
              experience, projects and ATS compatibility.
            </p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">03</div>

          <div>
            <h2>Discover Your Skill Gaps</h2>
            <p>
              Find out which skills can improve your profile
              for your selected career path.
            </p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">04</div>

          <div>
            <h2>Get Personalized Recommendations</h2>
            <p>
              Receive AI-powered suggestions to make your
              resume stronger and more job-ready.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default HowItWorks;