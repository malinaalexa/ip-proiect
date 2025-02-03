const express = require("express");
const { createRoom } = require("../controllers/streamingRoomController");

const router = express.Router();

// Routes
router.post("/", createRoom);

module.exports = router;
