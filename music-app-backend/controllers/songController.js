const { executeQuery } = require("../models/queries");
const sql = require("mssql");
exports.getSongs = async (req, res) => {
    try {
      const songs = await executeQuery("SELECT * FROM Songs");
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch songs" });
    }
  };
  
  exports.addSong = async (req, res) => {
    const { name, artist, genres, link } = req.body;
    try {
      await executeQuery(
        "INSERT INTO Songs (name, artist, genres, link) VALUES (@Name, @Artist, @Genres, @Link)",
        [
          { name: "Name", type: sql.NVarChar, value: name },
          { name: "Artist", type: sql.NVarChar, value: artist },
          { name: "Genres", type: sql.NVarChar, value: JSON.stringify(genres) },
          { name: "Link", type: sql.NVarChar, value: link },
        ]
      );
      res.status(201).json({ message: "Song added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add song" });
    }
  };
  