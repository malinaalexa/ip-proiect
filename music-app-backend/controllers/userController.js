const express = require("express");
const { executeQuery } = require("../models/queries");
const sql = require("mssql");

exports.getProfile = async (req, res) => {
  // from JWT middleware
  const userId = req.user.id;
  try {
    const user = await executeQuery("SELECT * FROM Users WHERE id = @UserId", [
      { name: "UserId", type: sql.Int, value: userId },
    ]);
    res.status(200).json(user[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
    const { name, email } = req.body;
    try {
        await executeQuery(
        "UPDATE Users SET name = @Name, email = @Email WHERE id = @UserId",
        [
            { name: "Name", type: sql.NVarChar, value: name },
            { name: "Email", type: sql.NVarChar, value: email },
            { name: "UserId", type: sql.Int, value: userId },
        ]
        );
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update profile" });
    }
    }

