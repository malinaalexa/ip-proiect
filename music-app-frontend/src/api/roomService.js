import axiosInstance from './axiosInstance';
import RoomModel from '../models/RoomModel';

export default class RoomService {
  static async getAllRooms() {
    const response = await axiosInstance.get('/rooms');
    return response.data.map((room) => RoomModel.fromServerResponse(room));
  }

  static async getRoomDetails(roomId) {
    const response = await axiosInstance.get(`/rooms/${roomId}`);
    return RoomModel.fromServerResponse(response.data);
  }
}
