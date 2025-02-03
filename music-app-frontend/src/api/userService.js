import axiosInstance from './axiosInstance';
import UserModel from '../models/UserModel';

export default class UserService {
  static async getProfile() {
    const response = await axiosInstance.get('/users/profile');
    return UserModel.fromServerResponse(response.data);
  }

  static async updateProfile({ favoriteGenres, favoriteArtists }) {
    const response = await axiosInstance.put('/users/profile', {
      favorite_genres: favoriteGenres,
      favorite_artists: favoriteArtists,
    });
    return response.data;
  }
}
