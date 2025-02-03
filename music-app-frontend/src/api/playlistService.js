import axiosInstance from './axiosInstance';
import PlaylistModel from '../models/PlaylistModel';

export default class PlaylistService {
  static async getAllPlaylists() {
    const response = await axiosInstance.get('/playlists');
    return response.data.map((playlist) => PlaylistModel.fromServerResponse(playlist));
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
