const express = require("express");
const userController = require("../controllers/userController");
const playlistController = require("../controllers/playlistController");
const songController = require("../controllers/songController");
const eventController = require("../controllers/eventController");

const router = express.Router();

// User Routes
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Playlist Routes
router.get("/playlists", playlistController.getPlaylists);
router.post("/playlists", playlistController.createPlaylist);
router.put("/playlists/:id", playlistController.updatePlaylist);
router.delete("/playlists/:id", playlistController.deletePlaylist);

// Song Routes
router.get("/songs", songController.getSongs);
router.post("/songs", songController.addSong);

// Event Routes
router.get("/events", eventController.getEvents);
router.post("/events", eventController.createEvent);
router.post("/events/:id/participate", eventController.participateInEvent);

module.exports = router;
