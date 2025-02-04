import axiosInstance from './axiosInstance';
import UserModel from '../models/UserModel';

export default class UserService {
  static async getProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch("http://localhost:3001/api/auth/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
  }

  static async updateProfile({ favoriteGenres, favoriteArtists }) {
    const response = await axiosInstance.put('/users/profile', {
      favorite_genres: favoriteGenres,
      favorite_artists: favoriteArtists,
    });
    return response.data;
  }
}
