// features/user/api/userAPI.js
import { api } from "shared/lib/axios";

export const userAPI = {
  getUser: (userId) => api.get(`/userInfo/${userId}`),

  updateUser: (userId, data) =>
    api.put(`/userInfo/update/${userId}`, data),
};
