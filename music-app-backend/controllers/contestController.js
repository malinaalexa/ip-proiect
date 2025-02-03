const { executeQuery } = require("../models/queries");
const sql = require("mssql");
exports.getContests = async (req, res) => {
    try {
      const contests = await executeQuery("SELECT * FROM Contests");
      res.status(200).json(contests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contests" });
    }
  };
  

exports.addContest = async (req, res) => {
    try {
        const { name, description, start_date, end_date, reward } = req.body;
        await executeQuery(
            "INSERT INTO Contests (name, description, start_date, end_date, reward) VALUES (@Name, @Description, @StartDate, @EndDate, @Reward)",
            [
                { name: "Name", type: sql.NVarChar, value: name },
                { name: "Description", type: sql.NVarChar, value: description },
                { name: "StartDate", type: sql.DateTime, value: start_date },
                { name: "EndDate", type: sql.DateTime, value: end_date },
                { name: "Reward", type: sql.NVarChar, value: reward },
            ]
        );
        res.status(201).json({ message: "Contest added successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add contest" });
    }
}