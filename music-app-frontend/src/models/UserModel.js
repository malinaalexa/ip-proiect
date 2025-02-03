export default class UserModel {
    constructor({ id, email, name, points, favoriteGenres, favoriteArtists }) {
      this.id = id;
      this.email = email;
      this.name = name;
      this.points = points;
      this.favoriteGenres = favoriteGenres || [];
      this.favoriteArtists = favoriteArtists || [];
    }
  
    static fromServerResponse(data) {
      return new UserModel({
        id: data.id,
        email: data.email,
        name: data.name,
        points: data.points,
        favoriteGenres: JSON.parse(data.favorite_genres || '[]'),
        favoriteArtists: JSON.parse(data.favorite_artists || '[]'),
      });
    }
  }
  