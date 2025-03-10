import axios from 'axios';

const API_URL = "http://localhost:5000/api/quiz";

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Fetched quiz data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    if (error.response) {
        console.error("API responded with error:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
    return null;
  }
};
