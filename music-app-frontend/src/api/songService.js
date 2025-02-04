import axios from "axios";

const API_URL = "http://localhost:3001/api/songs"; // Backend URL

const SongService = {
  getSongs: async (query) => {
    const response = await axios.get(API_URL, { params: { query } });
    return response.data;
  },
};

export default SongService;
