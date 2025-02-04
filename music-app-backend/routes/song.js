const express = require("express");
const { getSongs, logListeningHistory, getListeningMetrics } = require("../controllers/songController");

const router = express.Router();
const { authenticate } = require("../middleware/auth");
// GET /api/songs/          → Return songs from YouTube
router.get("/", getSongs);

// POST /api/songs/log       → Log listening history (must be POST)
router.post("/log", authenticate, logListeningHistory);

// GET /api/songs/metrics    → Fetch listening metrics
router.get("/metrics", authenticate, getListeningMetrics);

module.exports = router;
