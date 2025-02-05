const express = require("express");
const { getPlaylists, createPlaylist, getPlaylistDetails, addSongToPlaylist } = require("../controllers/playlistController");

const router = express.Router();

// Routes
router.get("/", getPlaylists);
router.post("/", createPlaylist);
router.get("/:id", getPlaylistDetails);
router.post("/:playlistId/add-song", addSongToPlaylist); // New route for adding song to playlist

module.exports = router;
