import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchActivities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/activities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching activities", error);
    throw error;
  }
};

export default API_BASE_URL;
