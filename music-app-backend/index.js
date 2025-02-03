const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const playlistRoutes = require("./routes/playlist");
const songRoutes = require("./routes/song");
const streamingRoomRoutes = require("./routes/streamingRoom");
const contestRoutes = require("./routes/contest");
const rewardRoutes = require("./routes/reward");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/rooms", streamingRoomRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/rewards", rewardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
