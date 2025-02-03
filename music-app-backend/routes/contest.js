const express = require("express");
const { getContests } = require("../controllers/contestController");

const router = express.Router();

// Routes
router.get("/", getContests);

module.exports = router;
