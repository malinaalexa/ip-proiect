const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");

const router = express.Router();
const { authenticate } = require("../middleware/auth");

// Routes
// user is in query params
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

module.exports = router;
