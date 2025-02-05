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
      let parsedSongs = [];
    
      // Ensure proper parsing only if it's a string
      if (typeof data.songs === 'string') {
        try {
          parsedSongs = JSON.parse(data.songs);
        } catch (error) {
          console.error("Error parsing songs:", data.songs, error);
          parsedSongs = []; // Default to empty array on error
        }
      } else if (Array.isArray(data.songs)) {
        parsedSongs = data.songs; // If already an array, use as-is
      }
    
  

  return new PlaylistModel({
    id: data.id,
    userId: data.user_id,
    name: data.name,
    songs: parsedSongs,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });

  }}