import axios from "axios";

const API = "/api/analytics";

export const getConversionRates = async () => {
  const res = await axios.get(`${API}/conversion`);
  return res.data;
};
