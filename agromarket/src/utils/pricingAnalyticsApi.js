import axios from "axios";

export const getPricingConversionRates = async () => {
    const res = await axios.get("/api/admin/pricing/all");
    return res.data;
};
