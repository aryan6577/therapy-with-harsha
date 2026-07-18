import axios from "../utils/axiosInstance";

// ========================================
// Admin APIs
// ========================================

export const getDashboardStats = () => {
  return axios.get(
    "/admin/dashboard-stats"
  );
};

export const getPatients = () => {
  return axios.get(
    "/admin/patients"
  );
};

export const getPatient = (id) => {
  return axios.get(
    `/admin/patients/${id}`
  );
};

export const searchPatients = (
  query
) => {
  return axios.get(
    `/admin/search?q=${query}`
  );
};