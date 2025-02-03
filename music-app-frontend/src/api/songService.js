import axiosInstance from './axiosInstance';
import SongModel from '../models/SongModel';

export default class SongService {
  static async getAllSongs() {
    const response = await axiosInstance.get('/songs');
    return response.data.map((song) => SongModel.fromServerResponse(song));
  }

  static async addSong(name, artist, genres, link) {
    const response = await axiosInstance.post('/songs', {
      name,
      artist,
      genres,
      link,
    });
    return SongModel.fromServerResponse(response.data);
  }
}
