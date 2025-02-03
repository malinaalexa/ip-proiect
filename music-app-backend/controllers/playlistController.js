const { executeQuery } = require("../models/queries");
const sql = require("mssql");
exports.getPlaylists = async (req, res) => {
    try {
      const playlists = await executeQuery("SELECT * FROM Playlists");
      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch playlists" });
    }
  };
  
  exports.createPlaylist = async (req, res) => {
    const { user_id, name, songs } = req.body;
    try {
      await executeQuery(
        "INSERT INTO Playlists (user_id, name, songs) VALUES (@UserId, @Name, @Songs)",
        [
          { name: "UserId", type: sql.Int, value: user_id },
          { name: "Name", type: sql.NVarChar, value: name },
          { name: "Songs", type: sql.NVarChar, value: JSON.stringify(songs) },
        ]
      );
      res.status(201).json({ message: "Playlist created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create playlist" });
    }
  };
  