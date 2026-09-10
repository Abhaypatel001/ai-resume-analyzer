const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadResume,
  getResumeById,
} = require("../controllers/resumeController");

const authMiddleware = require("../middleware/authMiddleware");

// =====================================
// UPLOAD + ANALYZE RESUME
// =====================================

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

// =====================================
// GET SINGLE RESUME ANALYSIS
// =====================================

router.get(
  "/:id",
  authMiddleware,
  getResumeById
);

module.exports = router;
