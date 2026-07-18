import axios from "../utils/axiosInstance";

// ========================================
// Authentication APIs
// ========================================

export const login = (data) => {
  return axios.post(
    "/auth/login",
    data
  );
};

export const register = (data) => {
  return axios.post(
    "/auth/register",
    data
  );
};