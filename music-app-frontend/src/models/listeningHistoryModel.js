// models/listeningHistoryModel.js
export default class ListeningHistoryModel {
    constructor({ id, userId, songUrl, songName, secondsListened, timestamp }) {
      this.id = id;
      this.userId = userId;
      this.songUrl = songUrl;
      this.songName = songName;
      this.secondsListened = secondsListened;
      this.timestamp = new Date(timestamp);
    }
  
    static fromServerResponse(data) {
      return new ListeningHistoryModel({
        id: data.id,
        userId: data.user_id,
        songUrl: data.song_url,
        songName: data.song_name,
        secondsListened: data.seconds_listened,
        timestamp: data.timestamp,
      });
    }
  }
  