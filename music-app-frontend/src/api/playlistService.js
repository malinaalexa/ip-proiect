// playlistService.js
import axiosInstance from './axiosInstance';// Assuming axiosInstance is properly set up
import PlaylistModel from "../models/PlaylistModel";

export default class PlaylistService {
  static async getAllPlaylists() {
    const response = await axiosInstance.get('/playlists');
    return response.data.map((playlist) => PlaylistModel.fromServerResponse(playlist));
  }

  static async getPlaylistDetails(id) {
    const response = await axiosInstance.get(`/playlists/${id}`); // Assuming the backend supports fetching a playlist by ID
    return PlaylistModel.fromServerResponse(response.data); // If the API returns data in a format like the PlaylistModel
  }

  static async createPlaylist(userId, name, songs) {
    const response = await axiosInstance.post('/playlists', {
      user_id: userId,
      name,
      songs,
    });
    return PlaylistModel.fromServerResponse(response.data);
  }
}
