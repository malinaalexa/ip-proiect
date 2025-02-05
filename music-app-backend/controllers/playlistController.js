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
  const { user_id, name, songs } = req.body;
  
  // Log the request body to verify the data
  console.log("Received request to create playlist with:", { user_id, name, songs });
  
  if (!songs || !Array.isArray(songs)) {
    console.log("Error: Invalid or missing songs array");
    return res.status(400).json({ error: "Invalid or missing songs array" });
  }
  
  try {
    // Log the SQL query before executing
    console.log("Executing SQL query to insert playlist...");
    
    await executeQuery(
      "INSERT INTO Playlists (user_id, name, songs) VALUES (@UserId, @Name, @Songs)",
      [
        { name: "UserId", type: sql.Int, value: user_id },
        { name: "Name", type: sql.NVarChar, value: name },
        { name: "Songs", type: sql.NVarChar, value: JSON.stringify(songs) },  // Make sure we're sending the songs as a stringified JSON
      ]
    );
    
    console.log("Playlist created successfully");
    res.status(201).json({ message: "Playlist created successfully" });
  } catch (error) {
    // Log the error details to help with debugging
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