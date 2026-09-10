import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UploadResume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // =====================================
  // FILE VALIDATION
  // =====================================

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF and DOCX files are allowed.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  // =====================================
  // FILE SELECT
  // =====================================

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    handleFile(selectedFile);
  };

  // =====================================
  // DRAG & DROP
  // =====================================

  const handleDrop = (e) => {
    e.preventDefault();

    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];

    handleFile(droppedFile);
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -------------------------------------
    // FILE CHECK
    // -------------------------------------

    if (!file) {
      alert("Please upload your resume.");
      return;
    }

    // -------------------------------------
    // JOB ROLE CHECK
    // -------------------------------------

    if (!jobRole) {
      alert("Please select your target job role.");
      return;
    }

    // -------------------------------------
    // TOKEN CHECK
    // -------------------------------------

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");

      navigate("/login");

      return;
    }

    try {
      setLoading(true);

      // -------------------------------------
      // FORM DATA
      // -------------------------------------

      const formData = new FormData();

      formData.append("resume", file);
      formData.append("jobRole", jobRole);
      formData.append("jobDescription", jobDescription);

      console.log("=================================");
      console.log("Uploading resume...");
      console.log("Job Role:", jobRole);
      console.log("Job Description:", jobDescription);
      console.log("File:", file.name);
      console.log("=================================");

      // -------------------------------------
      // API REQUEST
      // -------------------------------------

      const response = await fetch(
        "https://ai-resume-analyzer-backend-9mqo.onrender.com/api/resume/upload",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      // -------------------------------------
      // RESPONSE JSON
      // -------------------------------------

      const data = await response.json();

      console.log("Backend Response:", data);

      // -------------------------------------
      // API ERROR
      // -------------------------------------

      if (!response.ok) {
        throw new Error(
          data.message || "Resume upload failed."
        );
      }

      // -------------------------------------
      // RESUME CHECK
      // -------------------------------------

      if (!data.resume) {
        throw new Error(
          "Resume analysis completed but resume data was not returned."
        );
      }

      // -------------------------------------
      // GET RESUME ID
      // -------------------------------------

      const resumeId =
        data.resume.id || data.resume._id;

      console.log("Resume ID:", resumeId);

      // -------------------------------------
      // ID CHECK
      // -------------------------------------

      if (!resumeId) {
        console.error(
          "Resume object received:",
          data.resume
        );

        throw new Error(
          "Resume ID was not received from backend."
        );
      }

      // -------------------------------------
      // SAVE LATEST RESUME
      // -------------------------------------

      localStorage.setItem(
        "latestResume",
        JSON.stringify(data.resume)
      );

      // -------------------------------------
      // NOTIFY OTHER COMPONENTS
      // -------------------------------------

      window.dispatchEvent(
        new Event("resumeUploaded")
      );

      // -------------------------------------
      // SUCCESS
      // -------------------------------------

      alert(
        "Resume analyzed successfully! 🎉"
      );

      // -------------------------------------
      // GO TO ANALYSIS PAGE
      // -------------------------------------

      navigate(`/analysis/${resumeId}`);

    } catch (error) {
      console.error(
        "Upload Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while uploading your resume."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // REMOVE FILE
  // =====================================

  const removeFile = () => {
    setFile(null);
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div className="upload-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="upload-top">

        <div>

          <span className="upload-badge">
            ✦ AI Resume Analyzer
          </span>

          <h1>
            Analyze Your Resume
          </h1>

          <p>
            Upload your resume and let AI discover
            your strengths, skill gaps and
            improvement areas.
          </p>

        </div>

        <Link
          to="/dashboard"
          className="back-dashboard-btn"
        >
          ← Dashboard
        </Link>

      </div>


      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="upload-layout">

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div className="upload-main-card">

          {/* CARD HEADER */}

          <div className="card-title">

            <div>

              <span>
                STEP 01
              </span>

              <h2>
                Upload Your Resume
              </h2>

            </div>

            <div className="upload-icon">
              📄
            </div>

          </div>


          {/* =====================================
              DROPZONE
          ===================================== */}

          {!file ? (

            <label
              className={`resume-dropzone ${
                dragActive ? "drag-active" : ""
              }`}

              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}

              onDragLeave={() => {
                setDragActive(false);
              }}

              onDrop={handleDrop}
            >

              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                hidden
              />

              <div className="drop-icon">
                ☁️
              </div>

              <h3>
                Drag & drop your resume here
              </h3>

              <p>
                or click to browse from your computer
              </p>

              <span className="file-types">
                PDF or DOCX • Maximum 5MB
              </span>

            </label>

          ) : (

            /* SELECTED FILE */

            <div className="selected-file">

              <div className="selected-file-icon">
                📄
              </div>

              <div className="selected-file-info">

                <strong>
                  {file.name}
                </strong>

                <span>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>

              </div>

              <button
                type="button"
                className="remove-file-btn"
                onClick={removeFile}
              >
                ×
              </button>

            </div>

          )}


          {/* =====================================
              FORM
          ===================================== */}

          <form onSubmit={handleSubmit}>

            {/* JOB ROLE */}

            <div className="upload-form-group">

              <label>
                Target Job Role
              </label>

              <select
                value={jobRole}
                onChange={(e) =>
                  setJobRole(e.target.value)
                }
              >

                <option value="">
                  Select your target role
                </option>

                <option value="Frontend Developer">
                  Frontend Developer
                </option>

                <option value="Backend Developer">
                  Backend Developer
                </option>

                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>

                <option value="MERN Stack Developer">
                  MERN Stack Developer
                </option>

                <option value="Software Developer">
                  Software Developer
                </option>

                <option value="Data Analyst">
                  Data Analyst
                </option>

                <option value="AI/ML Engineer">
                  AI/ML Engineer
                </option>

              </select>

            </div>


            {/* JOB DESCRIPTION */}

            <div className="upload-form-group">

              <div className="label-row">

                <label>
                  Job Description
                </label>

                <span>
                  Optional
                </span>

              </div>

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }

                placeholder="Paste the job description here. AI will compare it with your resume and calculate your job match..."

                rows={7}
              />

            </div>


            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="analyze-resume-btn"
              disabled={loading}
            >

              {loading ? (

                <>
                  <span className="button-spinner"></span>
                  Analyzing Resume...
                </>

              ) : (

                <>
                  ✨ Analyze My Resume
                  <span>→</span>
                </>

              )}

            </button>

          </form>

        </div>


        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="upload-side">

          {/* AI CARD */}

          <div className="ai-info-card">

            <div className="ai-card-icon">
              ✦
            </div>

            <h3>
              What AI Will Analyze
            </h3>

            <p>
              Our AI will evaluate your resume
              across multiple important areas.
            </p>


            <div className="ai-check-list">

              <div>
                <span>✓</span>
                <p>ATS Compatibility</p>
              </div>

              <div>
                <span>✓</span>
                <p>Skills & Technologies</p>
              </div>

              <div>
                <span>✓</span>
                <p>Experience & Achievements</p>
              </div>

              <div>
                <span>✓</span>
                <p>Projects & Education</p>
              </div>

              <div>
                <span>✓</span>
                <p>Resume Content Quality</p>
              </div>

              <div>
                <span>✓</span>
                <p>Job Description Match</p>
              </div>

            </div>

          </div>


          {/* SECURITY */}

          <div className="security-card">

            <div className="security-icon">
              🔒
            </div>

            <div>

              <strong>
                Your Resume is Secure
              </strong>

              <p>
                Your uploaded resume is processed
                securely and is only used for analysis.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadResume;
