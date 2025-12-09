// features/order/api/orderAPI.js
import { api } from "shared/lib/axios";

export const orderAPI = {
  getMyOrders: (userId) => api.get(`/orders/my/${userId}`),

  deleteOrder: (userId, orderCode) =>
    api.delete(`/orders/deleteOrder/${userId}/${orderCode}`),
};
