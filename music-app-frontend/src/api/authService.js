import axiosInstance from './axiosInstance';

export default class AuthService {
  static async login(email, password) {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data; // Returns the token
  }

  static async register(email, password, name) {
    const response = await axiosInstance.post('/auth/register', { email, password, name });
    return response.data;
  }
}
