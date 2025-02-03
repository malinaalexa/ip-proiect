export default class SongModel {
    constructor({ id, name, artist, genres, link, popularity }) {
      this.id = id;
      this.name = name;
      this.artist = artist;
      this.genres = genres || []; // Array of genre strings
      this.link = link;
      this.popularity = popularity || 0;
    }
  
    static fromServerResponse(data) {
      return new SongModel({
        id: data.id,
        name: data.name,
        artist: data.artist,
        genres: JSON.parse(data.genres || '[]'),
        link: data.link,
        popularity: data.popularity,
      });
    }
  }
  