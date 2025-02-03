const { executeQuery } = require("../models/queries");
const sql = require("mssql");
exports.getRewards = async (req, res) => {
    try {
      const rewards = await executeQuery("SELECT * FROM Rewards");
      res.status(200).json(rewards);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch rewards" });
    }
  };
  

exports.addReward = async (req, res) => {
    const { name, points, description } = req.body;
    try {
      await executeQuery(
        "INSERT INTO Rewards (name, points, description) VALUES (@Name, @Points, @Description)",
        [
          { name: "Name", type: sql.NVarChar, value: name },
          { name: "Points", type: sql.Int, value: points },
          { name: "Description", type: sql.NVarChar, value: description },
        ]
      );
      res.status(201).json({ message: "Reward added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add reward" });
    }
  }