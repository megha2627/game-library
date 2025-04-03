// src/services/api.js
import axios from "axios";

const API_KEY = "ce3904e0991a4b609773a651555d36a9";
const BASE_URL = "https://api.rawg.io/api";

export const fetchGames = async (params) => {
  try {
    const url = `${BASE_URL}/games`;
    const fullParams = { key: API_KEY, ...params };
    console.log("Requesting:", { url, params: fullParams });
    const response = await axios.get(url, {
      params: fullParams,
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

export const fetchGameDetails = async (id) => {
  try {
    const url = `${BASE_URL}/games/${id}`;
    console.log("Requesting:", { url, params: { key: API_KEY } });
    const response = await axios.get(url, {
      params: { key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
};
