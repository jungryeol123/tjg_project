// shared
import { api } from 'shared/lib/axios.js';

export const getPricingConversionRates = async () => {
    const res = await api.get("/api/admin/pricing/all");
    return res.data;
};
