const express = require("express");
const { getRewards, addReward } = require("../controllers/rewardController");

const router = express.Router();

// Routes
router.get("/", getRewards);
router.post("/", addReward);

module.exports = router;
