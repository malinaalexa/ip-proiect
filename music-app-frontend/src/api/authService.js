import axiosInstance from './axiosInstance';

export default class AuthService {
  static async login(email, password) {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const { token, user } = response.data;

    // Save the token in localStorage for persistence
    localStorage.setItem('authToken', token);

    // Save user info (you could also store the user in localStorage, but we'll use Context)
    return { user, token };
  }

  static async register(email, password, name) {
    const response = await axiosInstance.post('/auth/register', { email, password, name });
    return response.data;
  }

  // Check if the user is logged in by reading the token from localStorage
  static getCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode the JWT token and get the user data (using jwt-decode library for example)
      return { token };  // Optionally, you can return decoded user data
    }
    return null;
  }
// src/api/AuthService.js

static async getProfile() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("No auth token found");
    }

    const response = await axiosInstance.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data; // Returns user profile data

  } catch (error) {
    console.error("Failed to fetch user profile", error.response?.data || error.message);
    return null;
  }
}


  static logout() {
    // Remove the token from localStorage on logout
    localStorage.removeItem('authToken');
  }
}
