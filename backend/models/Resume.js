const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    // =========================
    // USER
    // =========================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =========================
    // UPLOADED FILE
    // =========================

    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    // =========================
    // TARGET JOB
    // =========================

    jobRole: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      default: "",
    },

    // =========================
    // EXTRACTED RESUME TEXT
    // =========================

    extractedText: {
      type: String,
      default: "",
    },

    // =========================
    // AI ANALYSIS SCORES
    // =========================

    score: {
      type: Number,
      default: 0,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    skillsScore: {
      type: Number,
      default: 0,
    },

    experienceScore: {
      type: Number,
      default: 0,
    },

    projectsScore: {
      type: Number,
      default: 0,
    },

    // =========================
    // SKILLS
    // =========================

    skills: {
      type: [String],
      default: [],
    },

    skillGaps: {
      type: [String],
      default: [],
    },

    // =========================
    // AI RECOMMENDATIONS
    // =========================

    recommendations: {
      type: [String],
      default: [],
    },
    // =========================
    // AI SUMMARY
    // =========================

     summary: {
      type: String,
      default: "",
    },


    // =========================
    // JOB MATCH
    // =========================

    jobMatch: {
      type: Number,
      default: 0,
    },

    
   
    // =========================
    // ANALYSIS STATUS
    // =========================

    analysisStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);