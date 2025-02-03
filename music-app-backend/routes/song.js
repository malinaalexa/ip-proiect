const express = require("express");
const { getSongs, addSong } = require("../controllers/songController");

const router = express.Router();

// Routes
router.get("/", getSongs);
router.post("/", addSong); // Admin can add songs

module.exports = router;
