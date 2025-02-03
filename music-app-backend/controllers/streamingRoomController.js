const { executeQuery } = require("../models/queries");
const sql = require("mssql");
exports.createRoom = async (req, res) => {
    const { host_id, playlist_id } = req.body;
    try {
      await executeQuery(
        "INSERT INTO StreamingRooms (host_id, playlist_id) VALUES (@HostId, @PlaylistId)",
        [
          { name: "HostId", type: sql.Int, value: host_id },
          { name: "PlaylistId", type: sql.Int, value: playlist_id },
        ]
      );
      res.status(201).json({ message: "Streaming room created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create streaming room" });
    }
  };
  