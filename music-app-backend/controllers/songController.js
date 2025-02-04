
require("dotenv").config();
const { executeQuery } = require("../models/queries");
const sql = require("mssql");
const axios = require("axios"); // Ensure axios is imported
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Ensure the API key is set

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

exports.getSongs = async (req, res) => {
  const { query } = req.query; // Search query from frontend
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(YOUTUBE_SEARCH_URL, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 10,
        key: YOUTUBE_API_KEY,
      },
    });

    const songs = response.data.items.map((item) => ({
      id: item.id.videoId,
      name: item.snippet.title,
      artist: item.snippet.channelTitle,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.high.url,
    }));

    res.status(200).json(songs);
  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ error: "Failed to fetch songs from YouTube" });
  }
};
// controllers/songController.js

// Define addSong (even as a placeholder if you aren't using it yet)
exports.addSong = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};


exports.logListeningHistory = async (req, res) => {
  const {videoUrl: songUrl, secondsListened, songName } = req.body;
  const userId = req.user.id;
  if (!userId || !songUrl || secondsListened == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const query = `
      INSERT INTO ListeningHistory (user_id, song_url, song_name, seconds_listened, timestamp)
      VALUES (@userId, @songUrl, @songName, @secondsListened, GETDATE());
    `;

    const params = [
      { name: "userId", type: sql.Int, value: userId },
      { name: "songUrl", type: sql.VarChar, value: songUrl },
      { name: "songName", type: sql.VarChar, value: songName },
      { name: "secondsListened", type: sql.Int, value: secondsListened },
    ];

    await executeQuery(query, params);

    res.status(200).json({ message: "Listening history saved successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Failed to save listening history" });
  }
};



exports.getListeningMetrics = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const result = await executeQuery(
      `SELECT song_name, song_url, SUM(seconds_listened) AS total_seconds 
       FROM ListeningHistory 
       WHERE user_id = @userId 
       GROUP BY song_name, song_url
       ORDER BY total_seconds DESC`,
      [{ name: "userId", type: sql.Int, value: userId }]
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching listening metrics:", error);
    res.status(500).json({ error: "Failed to fetch listening metrics" });
  }
};


