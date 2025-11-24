// shared/ui/floating/ChatBotPanel.jsx

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatBotPanel.scss";

export default function ChatBotPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "안녕하세요! 무엇을 도와드릴까요? 😊" }
  ]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const myMessage = { from: "me", text: input };
    setMessages((prev) => [...prev, myMessage]);

    const sendText = input;
    setInput("");

    try {
      const res = await axios.post("/api/chatbot/ask", {
        upk: JSON.parse(localStorage.getItem("loginInfo"))?.id,
        message: sendText,
      });
    
      console.log("res", res.data);
      const botMessage = { from: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "서버 오류가 발생했습니다. 다시 시도해주세요." }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-panel">
      {/* 헤더 */}
      <div className="chat-header">
        <span>AI 고객센터</span>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      {/* 메시지 영역 */}
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.from === "me" ? "me" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* 입력창 */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}
