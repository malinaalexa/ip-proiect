import axiosInstance from './axiosInstance';
import RewardModel from '../models/RewardModel';

export default class RewardService {
  static async getAllRewards() {
    const response = await axiosInstance.get('/rewards');
    return response.data.map((reward) => RewardModel.fromServerResponse(reward));
  }

  static async getRewardDetails(rewardId) {
    const response = await axiosInstance.get(`/rewards/${rewardId}`);
    return RewardModel.fromServerResponse(response.data);
  }
}
