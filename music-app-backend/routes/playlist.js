const express = require("express");
const { getPlaylists, createPlaylist, getPlaylistDetails } = require("../controllers/playlistController");

const router = express.Router();

// Routes
router.get("/", getPlaylists);
router.post("/", createPlaylist);
router.get("/:id", getPlaylistDetails);
module.exports = router;
