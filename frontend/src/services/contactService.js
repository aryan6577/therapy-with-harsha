import axios from "../utils/axiosInstance";

// ========================================
// Contact API
// ========================================

export const sendContactMessage = (data) => {

  return axios.post(
    "/contact",
    data
  );

};