const mongoose = require("mongoose");
const fs = require("fs");
const Resume = require("../models/Resume");
const mammoth = require("mammoth");

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.mjs");

const { analyzeResume } = require("../Services/aiService");

// =====================================
// EXTRACT PDF TEXT
// =====================================

const extractPdfText = async (filePath) => {
  try {
    const data = new Uint8Array(
      fs.readFileSync(filePath)
    );

    const loadingTask = pdfjsLib.getDocument({
      data,
    });

    const pdf = await loadingTask.promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str || "")
        .join(" ");

      text += pageText + "\n";
    }

    return text.trim();
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw new Error("Failed to extract text from PDF.");
  }
};

// =====================================
// UPLOAD + ANALYZE RESUME
// =====================================

const uploadResume = async (req, res) => {
  try {
    console.log("=================================");
    console.log("RESUME UPLOAD STARTED");
    console.log("User:", req.userId);
    console.log("File:", req.file?.originalname);
    console.log("=================================");

    // =====================================
    // CHECK FILE
    // =====================================

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume.",
      });
    }

    // =====================================
    // CHECK USER
    // =====================================

    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated.",
      });
    }

    // =====================================
    // GET JOB DETAILS
    // =====================================

    const { jobRole, jobDescription } = req.body;

    console.log("Job Role:", jobRole);
    console.log("Job Description:", jobDescription);

    if (!jobRole || !jobRole.trim()) {
      return res.status(400).json({
        message: "Job role is required.",
      });
    }

    // =====================================
    // EXTRACT TEXT
    // =====================================

    let extractedText = "";

    console.log("File type:", req.file.mimetype);

    // =====================================
    // PDF
    // =====================================

    if (req.file.mimetype === "application/pdf") {
      console.log("Extracting PDF text...");

      extractedText = await extractPdfText(
        req.file.path
      );
    }

    // =====================================
    // DOCX
    // =====================================

    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      console.log("Extracting DOCX text...");

      const result = await mammoth.extractRawText({
        path: req.file.path,
      });

      extractedText = result.value || "";
    }

    // =====================================
    // UNSUPPORTED FILE
    // =====================================

    else {
      return res.status(400).json({
        message: "Unsupported file type.",
      });
    }

    // =====================================
    // CLEAN TEXT
    // =====================================

    extractedText = extractedText
      .replace(/\s+/g, " ")
      .trim();

    console.log(
      "Extracted text length:",
      extractedText.length
    );

    // =====================================
    // TEXT NOT FOUND
    // =====================================

    if (!extractedText) {
      return res.status(400).json({
        message:
          "Could not extract text from your resume. Please upload a text-based PDF or DOCX.",
      });
    }

    // =====================================
    // SAVE INITIAL RESUME
    // =====================================

    const resume = await Resume.create({
      user: req.userId,

      fileName: req.file.originalname,

      filePath: req.file.path,

      fileType: req.file.mimetype,

      jobRole: jobRole.trim(),

      jobDescription:
        jobDescription?.trim() || "",

      extractedText,

      analysisStatus: "pending",
    });

    console.log(
      "Resume saved:",
      resume._id
    );

    // =====================================
    // GEMINI AI ANALYSIS
    // =====================================

    console.log("Starting Gemini analysis...");

    const analysis = await analyzeResume({
      resumeText: extractedText,

      jobRole: jobRole.trim(),

      jobDescription:
        jobDescription?.trim() || "",
    });

    console.log("Gemini analysis received.");

    // =====================================
    // SAVE AI RESULT
    // =====================================

    resume.score =
      Number(analysis.overallScore) || 0;

    resume.atsScore =
      Number(analysis.atsCompatibility) || 0;

    resume.skillsScore =
      Number(analysis.skillsScore) || 0;

    resume.experienceScore =
      Number(analysis.experienceScore) || 0;

    resume.projectsScore =
      Number(analysis.projectsScore) || 0;

    // =====================================
    // SKILLS
    // =====================================

    resume.skills =
      Array.isArray(analysis.detectedSkills)
        ? analysis.detectedSkills.map((skill) =>
            String(skill).trim()
          )
        : [];

    // =====================================
    // SKILL GAPS
    // =====================================

    resume.skillGaps =
      Array.isArray(analysis.skillGaps)
        ? analysis.skillGaps.map((item) => {
            if (typeof item === "string") {
              return item;
            }

            return `${item.skill} - ${item.priority} Priority`;
          })
        : [];

    // =====================================
    // RECOMMENDATIONS
    // =====================================

    resume.recommendations =
      Array.isArray(analysis.recommendations)
        ? analysis.recommendations.map((item) => {
            if (typeof item === "string") {
              return item;
            }

            return `${item.title}: ${item.description}`;
          })
        : [];

    // =====================================
    // JOB MATCH
    // =====================================

    resume.jobMatch =
      Number(analysis.jobMatch?.score) || 0;

    // =====================================
    // SUMMARY
    // =====================================

    resume.summary =
      analysis.summary || "";

    // =====================================
    // COMPLETED
    // =====================================

    resume.analysisStatus = "completed";

    await resume.save();

    console.log(
      "Resume analysis saved successfully."
    );

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(201).json({
      message:
        "Resume analyzed successfully.",

      resume: {
        id: resume._id,

        fileName: resume.fileName,

        jobRole: resume.jobRole,

        score: resume.score,

        atsScore: resume.atsScore,

        skillsScore:
          resume.skillsScore,

        experienceScore:
          resume.experienceScore,

        projectsScore:
          resume.projectsScore,

        skills: resume.skills,

        skillGaps:
          resume.skillGaps,

        recommendations:
          resume.recommendations,

        jobMatch:
          resume.jobMatch,

        summary:
          resume.summary,

        analysisStatus:
          resume.analysisStatus,
      },
    });

  } catch (error) {
    console.error(
      "================================="
    );

    console.error(
      "Resume Analysis Error:",
      error
    );

    console.error(
      "================================="
    );

    return res.status(500).json({
      message:
        "Resume analysis failed.",

      error:
        error.message,
    });
  }
};

// =====================================
// GET RESUME BY ID
// =====================================

const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================
    // CHECK ID
    // =====================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid resume ID.",
      });
    }

    // =====================================
    // FIND USER RESUME
    // =====================================

    const resume = await Resume.findOne({
      _id: id,
      user: req.userId,
    }).lean();

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found.",
      });
    }

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).json({
      message:
        "Resume analysis fetched successfully.",

      resume: {
        id: resume._id,

        fileName:
          resume.fileName,

        jobRole:
          resume.jobRole,

        jobDescription:
          resume.jobDescription,

        score:
          Number(resume.score) || 0,

        atsScore:
          Number(resume.atsScore) || 0,

        skillsScore:
          Number(resume.skillsScore) || 0,

        experienceScore:
          Number(resume.experienceScore) || 0,

        projectsScore:
          Number(resume.projectsScore) || 0,

        skills:
          resume.skills || [],

        skillGaps:
          resume.skillGaps || [],

        recommendations:
          resume.recommendations || [],

        jobMatch:
          Number(resume.jobMatch) || 0,

        summary:
          resume.summary || "",

        analysisStatus:
          resume.analysisStatus,

        createdAt:
          resume.createdAt,
      },
    });

  } catch (error) {
    console.error(
      "Get Resume Error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch resume analysis.",

      error:
        error.message,
    });
  }
};
// =====================================
// GET USER RESUME HISTORY
// =====================================

const getResumeHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.userId,
    })
      .select(
        "fileName jobRole score atsScore skillsScore experienceScore projectsScore jobMatch analysisStatus createdAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Resume history fetched successfully.",
      resumes,
    });

  } catch (error) {
    console.error("Resume History Error:", error);

    return res.status(500).json({
      message: "Failed to fetch resume history.",
      error: error.message,
    });
  }
};


// =====================================
// DELETE RESUME ANALYSIS
// =====================================

const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid resume ID.",
      });
    }

    // Find only user's own resume
    const resume = await Resume.findOne({
      _id: id,
      user: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found.",
      });
    }

    // Delete uploaded file from server
    if (resume.filePath) {
      try {
        if (fs.existsSync(resume.filePath)) {
          fs.unlinkSync(resume.filePath);
          console.log("Resume file deleted.");
        }
      } catch (fileError) {
        console.error(
          "File delete error:",
          fileError
        );
      }
    }

    // Delete database record
    await Resume.deleteOne({
      _id: id,
      user: req.userId,
    });

    return res.status(200).json({
      message: "Resume analysis deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Resume Error:", error);

    return res.status(500).json({
      message: "Failed to delete resume analysis.",
      error: error.message,
    });
  }
};

// =====================================
// EXPORT
// =====================================

module.exports = {
  uploadResume,
  getResumeById,
};
