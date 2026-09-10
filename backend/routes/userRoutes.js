const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getDashboard,
} = require("../controllers/userController");

const router =
  express.Router();

// =====================================
// TEST ROUTE
// =====================================

router.get(
  "/test",
  (req, res) => {

    res.json({
      message:
        "USER ROUTE WORKING ✅",
    });

  }
);

// =====================================
// DASHBOARD
// =====================================

router.get(
  "/dashboard",
  protect,
  getDashboard
);

module.exports = router;
