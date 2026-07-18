import axios from "../utils/axiosInstance";

// ========================================
// Appointment APIs
// ========================================

export const getAppointments = () => {
  return axios.get("/appointment");
};

export const getAppointment = (id) => {
  return axios.get(`/appointment/${id}`);
};

export const bookAppointment = (data) => {
  return axios.post("/appointment/book", data);
};

export const approveAppointment = (id) => {
  return axios.put(`/appointment/approve/${id}`);
};

export const rejectAppointment = (
  id,
  reason
) => {
  return axios.put(
    `/appointment/reject/${id}`,
    {
      reason,
    }
  );
};

export const rescheduleAppointment = (
  id,
  date,
  time
) => {
  return axios.put(
    `/appointment/reschedule/${id}`,
    {
      date,
      time,
    }
  );
};

export const completeAppointment = (
  id
) => {
  return axios.put(
    `/appointment/complete/${id}`
  );
};

export const cancelAppointment = (
  id
) => {
  return axios.put(
    `/appointment/cancel/${id}`
  );
};

export const verifyPayment = (
  id
) => {
  return axios.put(
    `/appointment/verify-payment/${id}`
  );
};

export const submitPayment = (
  id,
  formData
) => {
  return axios.post(
    `/appointment/submit-payment/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

export const getBookedSlots = (
  date
) => {
  return axios.get(
    `/appointment/booked-slots/${date}`
  );
};