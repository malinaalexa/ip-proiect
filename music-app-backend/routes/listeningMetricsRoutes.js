// routes/listeningMetricsRoutes.js

const express = require('express');
const router = express.Router();

// Dummy example - Replace this with actual database logic to fetch listening metrics
router.get('/', async (req, res) => {
  try {
    const metrics = [
      { song: 'Song 1', listenedSeconds: 120 },
      { song: 'Song 2', listenedSeconds: 300 }
    ];
    res.json(metrics);
  } catch (error) {
    console.error("Error fetching listening metrics:", error);
    res.status(500).json({ error: "Failed to fetch listening metrics" });
  }
});

module.exports = router;
