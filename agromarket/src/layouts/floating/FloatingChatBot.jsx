import React, { useState } from "react";
import ChatBotPanel from "layouts/floating/ChatBotPanel.jsx";
import "./FloatingChatBot.scss";

export default function FloatingChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔥 떠있는 버튼 */}
      {!open && (
        <div className="floating-chatbot" onClick={() => setOpen(true)}>
          💬 문의하기
        </div>
      )}

      {/* 🔥 챗봇 패널 */}
      {open && <ChatBotPanel onClose={() => setOpen(false)} />}
    </>
  );
}
