
require("dotenv").config();

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

