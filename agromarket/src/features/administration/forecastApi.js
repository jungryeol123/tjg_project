import axios from "axios";

const API = "/api/forecast";

export const getSalesData = async (ppk) => {
  const res = await axios.get(`${API}/sales/${ppk}`);
  return res.data; // [{ day: "2025-11-10", qty: 3 }, ...]
};

export const getForecast = async (ppk) => {
  const res = await axios.get(`${API}/predict/${ppk}`);
  return res.data; // { next7Days: [...], next30Days: [...] }
};
