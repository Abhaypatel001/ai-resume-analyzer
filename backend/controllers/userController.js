const User = require("../models/User");
const Resume = require("../models/Resume");

// =====================================
// GET USER DASHBOARD
// =====================================

const getDashboard = async (req, res) => {
  try {

    // =====================================
    // CHECK AUTHENTICATED USER
    // =====================================

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User not authenticated.",
      });
    }

    const userId = req.user.userId;

    console.log("Dashboard User ID:", userId);

    // =====================================
    // GET USER
    // =====================================

    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // =====================================
    // GET USER RESUMES
    // =====================================

    const resumes = await Resume.find({
      user: userId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    console.log(
      "Total User Resumes:",
      resumes.length
    );

    // =====================================
    // COMPLETED ANALYSES
    // =====================================

    const analyzedResumes = resumes.filter(
      (resume) =>
        resume.analysisStatus === "completed"
    );

    // =====================================
    // TOTAL RESUMES ANALYZED
    // =====================================

    const resumesAnalyzed =
      analyzedResumes.length;

    // =====================================
    // AVERAGE SCORE
    // =====================================

    const averageScore =
      resumesAnalyzed > 0
        ? Math.round(
            analyzedResumes.reduce(
              (total, resume) =>
                total +
                (Number(resume.score) || 0),
              0
            ) / resumesAnalyzed
          )
        : 0;

    // =====================================
    // BEST JOB MATCH
    // =====================================

    const bestJobMatch =
      resumesAnalyzed > 0
        ? Math.max(
            ...analyzedResumes.map(
              (resume) =>
                Number(resume.jobMatch) || 0
            )
          )
        : 0;

    // =====================================
    // UNIQUE SKILLS
    // =====================================

    const allSkills =
      analyzedResumes.flatMap(
        (resume) =>
          Array.isArray(resume.skills)
            ? resume.skills
            : []
      );

    const uniqueSkills = [
      ...new Set(
        allSkills
          .map((skill) =>
            String(skill).trim()
          )
          .filter(Boolean)
      ),
    ];

    // =====================================
    // LATEST COMPLETED RESUME
    // =====================================

    const latestResume =
      analyzedResumes.length > 0
        ? analyzedResumes[0]
        : null;

    // =====================================
    // RECENT RESUME HISTORY
    // =====================================

    const recentResumes =
      resumes.slice(0, 5).map((resume) => ({
        _id: resume._id,

        fileName:
          resume.fileName,

        jobRole:
          resume.jobRole,

        score:
          Number(resume.score) || 0,

        jobMatch:
          Number(resume.jobMatch) || 0,

        atsScore:
          Number(resume.atsScore) || 0,

        skillsScore:
          Number(resume.skillsScore) || 0,

        experienceScore:
          Number(
            resume.experienceScore
          ) || 0,

        projectsScore:
          Number(
            resume.projectsScore
          ) || 0,

        skills:
          resume.skills || [],

        skillGaps:
          resume.skillGaps || [],

        recommendations:
          resume.recommendations || [],

        summary:
          resume.summary || "",

        analysisStatus:
          resume.analysisStatus,

        createdAt:
          resume.createdAt,
      }));

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).json({

      message:
        "Dashboard data fetched successfully",

      // =====================================
      // USER
      // =====================================

      user: {
        _id: user._id,
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },

      // =====================================
      // STATISTICS
      // =====================================

      statistics: {

        resumesAnalyzed,

        averageScore,

        bestJobMatch,

        skillsDetected:
          uniqueSkills.length,
      },

      // =====================================
      // LATEST RESUME
      // =====================================

      latestResume,

      // =====================================
      // RECENT RESUMES
      // =====================================

      recentResumes,
    });

  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

    return res.status(500).json({
      message: "Server error.",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};