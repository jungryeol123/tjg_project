// features/productList/api/headerProductAPI.js
import { setProductBestListAPI } from "features/product/productAPI";

export const headerProductAPI = {
  getBestProducts: async () => {
    return await setProductBestListAPI();
  },
};
    