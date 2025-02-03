export default class ContestModel {
    constructor({ id, name, startTime, endTime, songs, participants }) {
      this.id = id;
      this.name = name;
      this.startTime = new Date(startTime);
      this.endTime = new Date(endTime);
      this.songs = songs || []; // Array of song IDs
      this.participants = participants || []; // Array of user IDs
    }
  
    static fromServerResponse(data) {
      return new ContestModel({
        id: data.id,
        name: data.name,
        startTime: data.start_time,
        endTime: data.end_time,
        songs: JSON.parse(data.songs || '[]'),
        participants: JSON.parse(data.participants || '[]'),
      });
    }
  }
  