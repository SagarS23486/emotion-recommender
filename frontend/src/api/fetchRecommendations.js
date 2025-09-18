import axios from 'axios';

export const fetchRecommendations = async (emotion, type) => {
    try {
        const res = await axios.get(`http://localhost:5000/recommendations?emotion=${emotion}&type=${type}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
