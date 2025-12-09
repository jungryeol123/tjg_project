// shared
import { api } from "shared/lib/axios";

export const askChatbotAPI = async ({ userId, message }) => {
  const res = await api.post("/api/chatbot/ask", {
    upk: userId,
    message,
  });
  return res.data;
};
