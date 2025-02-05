const { executeQuery } = require("../models/queries");
const sql = require("mssql");
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await executeQuery("SELECT * FROM Playlists");
    
    playlists.forEach((p) => {
      try {
        p.songs = JSON.parse(p.songs); // Parse the JSON string correctly
      } catch (error) {
        console.error("Error parsing songs for playlist:", p, error);
        p.songs = []; // Fallback to an empty array if parsing fails
      }
    });

    res.status(200).json(playlists);
  } catch (error) {
    console.error("Failed to fetch playlists", error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
};


exports.createPlaylist = async (req, res) => {
  // Extract user_id and name properly from the nested object
  const { user_id: userObj, name, songs = [] } = req.body;

  // Log the request body to verify the data
  console.log("Received request to create playlist with:", { userObj, name, songs });

  // Ensure that user_id is correctly extracted from the nested object
  const user_id = userObj && userObj.user_id ? userObj.user_id : null;

  // Validate that user_id is a valid number
  if (isNaN(user_id)) {
    console.error("Invalid user_id:", user_id);
    return res.status(400).json({ error: "Invalid user_id" });
  }

  // Validate that name is provided
  if (!name || typeof name !== 'string' || name.trim() === '') {
    console.error("Invalid name:", name);
    return res.status(400).json({ error: "Invalid name for playlist" });
  }

  // Validate songs
  if (!Array.isArray(songs)) {
    console.log("Error: Invalid songs array");
    return res.status(400).json({ error: "Invalid songs array" });
  }

  try {
    // Log the SQL query before executing
    console.log("Executing SQL query to insert playlist...");

    await executeQuery(
      "INSERT INTO Playlists (user_id, name, songs) VALUES (@UserId, @Name, @Songs)",
      [
        { name: "UserId", type: sql.Int, value: parseInt(user_id, 10) }, // Ensure user_id is a valid integer
        { name: "Name", type: sql.NVarChar, value: name },
        { name: "Songs", type: sql.NVarChar, value: JSON.stringify(songs) }
      ]
    );

    console.log("Playlist created successfully");
    res.status(201).json({ message: "Playlist created successfully" });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ error: "Failed to create playlist" });
  }
};



  
  exports.getPlaylistDetails = async (req, res) => {
    const { id } = req.params; // Get the playlist ID from URL params
    try {
      const result = await executeQuery("SELECT * FROM Playlists WHERE id = @Id", [
        { name: "Id", type: sql.Int, value: id }
      ]);
      
      if (result.length === 0) {
        return res.status(404).json({ error: "Playlist not found" });
      }
      
      const playlist = result[0]; // Get the playlist
      playlist.songs = JSON.parse(playlist.songs || '[]'); // Parse the song URLs (if any)
      
      res.status(200).json(playlist); // Send playlist details as response
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch playlist details" });
    }
  };

  exports.addSongToPlaylist = async (req, res) => {
    const { playlistId } = req.params; // Playlist ID from the URL
    const { songId } = req.body; // Song ID from the request body
  
    try {
      // Fetch the playlist
      const result = await executeQuery("SELECT * FROM Playlists WHERE id = @Id", [
        { name: "Id", type: sql.Int, value: playlistId }
      ]);
  
      if (result.length === 0) {
        return res.status(404).json({ error: "Playlist not found" });
      }
  
      const playlist = result[0];
      const songs = JSON.parse(playlist.songs || '[]'); // Get the existing songs (if any)
  
      // Add the song to the playlist
      if (!songs.includes(songId)) {
        songs.push(songId); // Add the song ID if it's not already in the playlist
        await executeQuery(
          "UPDATE Playlists SET songs = @Songs WHERE id = @Id",
          [
            { name: "Songs", type: sql.NVarChar, value: JSON.stringify(songs) },
            { name: "Id", type: sql.Int, value: playlistId }
          ]
        );
        res.status(200).json({ message: "Song added to playlist successfully" });
      } else {
        res.status(400).json({ message: "Song is already in the playlist" });
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      res.status(500).json({ error: "Failed to add song to playlist" });
    }
  };