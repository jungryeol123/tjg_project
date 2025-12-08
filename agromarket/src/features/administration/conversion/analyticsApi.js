import { api } from 'shared/lib/axios.js';

const API = "/api/analytics";

export const getConversionRates = async () => {
  const res = await api.get(`${API}/conversion`);
  return res.data;
};
