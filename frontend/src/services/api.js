import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// ─── Driver APIs ───────────────────────────────────────────────

export const getAllDrivers = () => api.get('/drivers');

export const getAvailableDrivers = () => api.get('/drivers/available');

export const addDriver = (driverData) => api.post('/drivers', driverData);

export const updateDriverStatus = (id, availabilityStatus) =>
  api.patch(`/drivers/${id}/status`, { availabilityStatus });

export const deleteDriver = (id) => api.delete(`/drivers/${id}`);

// ─── Booking APIs ──────────────────────────────────────────────

export const getAllBookings = () => api.get('/bookings');

export const createBooking = (bookingData) => api.post('/bookings', bookingData);

export const updateBookingStatus = (id, status) =>
  api.patch(`/bookings/${id}/status`, { status });

export default api;
