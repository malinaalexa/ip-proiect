const express = require("express");
const { getPlaylists, createPlaylist } = require("../controllers/playlistController");

const router = express.Router();

// Routes
router.get("/", getPlaylists);
router.post("/", createPlaylist);

module.exports = router;
