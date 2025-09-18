import axios from 'axios';

export const fetchRecommendations = async (emotion, type) => {
  try {
    // cache buster to avoid browser/cdn caching: `&_=${Date.now()}`
    const url = `http://localhost:5000/recommendations?emotion=${encodeURIComponent(emotion)}&type=${encodeURIComponent(type)}&_=${Date.now()}`;
    console.log("Fetching:", url);
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("fetchRecommendations error:", error.message || error);
    return [];
  }
};
