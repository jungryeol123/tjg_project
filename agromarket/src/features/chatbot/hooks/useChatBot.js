// features/chatbot/useChatBot.js
import { useState, useEffect, useRef } from "react";
import { parseJwt } from "features/auth/parseJwt";
import { askChatbotAPI } from "features/chatbot/api/chatbotAPI";

export function useChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", type: "text", text: "안녕하세요! 무엇을 도와드릴까요? 😊" }
  ]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");

  const chatEndRef = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 로그인 사용자 정보 로딩
  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);
      setUserId(payload.id);
    }
  }, []);

  // 메시지 보내기
  const sendMessage = async () => {
    if (!input.trim()) return;

    const sendText = input;

    // 사용자가 보낸 메시지 추가
    setMessages(prev => [...prev, { from: "me", type: "text", text: sendText }]);
    setInput("");

    try {
      const result = await askChatbotAPI({ userId, message: sendText });

      if (result.data) {
        // 주문 정보 포함 응답
        setMessages(prev => [
          ...prev,
          { from: "bot", type: "text", text: result.reply },
          { from: "bot", type: "order", order: result.data }
        ]);
      } else {
        // 일반 텍스트 응답
        setMessages(prev => [
          ...prev,
          { from: "bot", type: "text", text: result.reply }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { from: "bot", type: "text", text: "서버 오류가 발생했습니다." }
      ]);
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    chatEndRef
  };
}
