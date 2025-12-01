// shared
import { api } from 'shared/lib/axios.js';

const API = "/api/forecast";

export const getSalesData = async (ppk) => {
  const res = await api.get(`${API}/sales/${ppk}`);
  return res.data; // [{ day: "2025-11-10", qty: 3 }, ...]
};

export const getForecast = async (ppk) => {
  const res = await api.get(`${API}/predict/${ppk}`);
  return res.data; // { next7Days: [...], next30Days: [...] }
};
