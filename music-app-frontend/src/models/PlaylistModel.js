export default class PlaylistModel {
    constructor({ id, userId, name, songs, createdAt, updatedAt }) {
      this.id = id;
      this.userId = userId;
      this.name = name;
      this.songs = songs || []; // Array of song IDs
      this.createdAt = new Date(createdAt);
      this.updatedAt = new Date(updatedAt);
    }
  
    static fromServerResponse(data) {
      return new PlaylistModel({
        id: data.id,
        userId: data.user_id,
        name: data.name,
        songs: JSON.parse(data.songs || '[]'),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      });
    }
  }
  