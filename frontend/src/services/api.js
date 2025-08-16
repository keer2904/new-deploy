import axios from 'axios';
import API_BASE_URL from "./apiConfig";


export const fetchActivities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/activities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching activities", error);
    throw error;
  }
};
