
import React from "react";
import { ChatMessage } from "features/chatbot/components/ChatMessage";
import { ChatOrderBlock } from "features/chatbot/components/ChatOrderBlock";
import { useChatBot } from "features/chatbot/hooks/useChatBot";
import './ChatBotPanel.scss'

export default function ChatBotPanel({ onClose }) {

  const {
    messages,
    input,
    setInput,
    sendMessage,
    chatEndRef
  } = useChatBot();

  return (
    <div className="chatbot-panel">
      <div className="chat-header">
        <span>AI 고객센터</span>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      <div className="chat-body">
        {messages.map((msg, idx) =>
          msg.type === "order"
            ? <ChatOrderBlock key={idx} order={msg.order} />
            : <ChatMessage key={idx} from={msg.from} text={msg.text} />
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}
