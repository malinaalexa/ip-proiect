const { executeQuery } = require("../models/queries");
const { getAll, insert } = require("../models/queries");
const sql = require("mssql");
exports.getEvents = async (req, res) => {
    try {
      const events = await getAll("Events");
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  };
  
  exports.createEvent = async (req, res) => {
    try {
      const { name, description, start_time, end_time } = req.body;
      await insert("Events", ["name", "description", "start_time", "end_time"], 
        [name, description, start_time, end_time]);
      res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  };
  
  exports.participateInEvent = async (req, res) => {
    try {
      const eventId = req.params.id;
      const { user_id } = req.body;
      await insert("Event_Participants", ["event_id", "user_id"], [eventId, user_id]);
      res.status(201).json({ message: "User added to event successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add user to event" });
    }
  };
  