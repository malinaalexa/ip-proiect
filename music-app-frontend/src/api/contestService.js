import axiosInstance from './axiosInstance';
import ContestModel from '../models/ContestModel';

export default class ContestService {
  static async getAllContests() {
    const response = await axiosInstance.get('/contests');
    return response.data.map((contest) => ContestModel.fromServerResponse(contest));
  }
}
