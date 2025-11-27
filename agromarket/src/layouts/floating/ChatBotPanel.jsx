import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
// features
import { parseJwt } from "features/auth/parseJwt";
import "./ChatBotPanel.scss";
import { api } from "shared/lib/axios";

export default function ChatBotPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", type: "text", text: "안녕하세요! 무엇을 도와드릴까요? 😊" }
  ]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);

      setUserId(payload.id); // ✅ 토큰 안의 id를 그대로 사용
    }
  }, [])

  // 배송 상태 텍스트 라벨
  const statusLabel = (status) => {
    switch (status) {
      case "READY":
        return "상품 준비중";
      case "SHIPPING":
        return "배송 중";
      case "DELIVERED":
        return "배송 완료";
      default:
        return "상태 정보 없음";
    }
  };

  // ETA 계산 (odate + 2일)
  const getEta = (odate) => {
    if (!odate) return "";
    const date = new Date(odate);
    date.setDate(date.getDate() + 1);
    return date.toLocaleString();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "me", type: "text", text: input }]);

    const sendText = input;
    setInput("");

    try {
      const res = await api.post("/api/chatbot/ask", {
        upk: userId,
        message: sendText,
      });

      const result = res.data;

      const order = result.data;

      if (order) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", type: "text", text: result.reply },
          { from: "bot", type: "order", order }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", type: "text", text: result.reply }
        ]);
      }

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", type: "text", text: "서버 오류가 발생했습니다." }
      ]);
    }
  };

  return (
    <div className="chatbot-panel">
      <div className="chat-header">
        <span>AI 고객센터</span>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      <div className="chat-body">
        {messages.map((msg, idx) => {
          if (msg.type === "order" && msg.order) {
            const o = msg.order;

            return (
              <div key={idx} className="chat-order-block">
                <div className="order-top">
                  <div className="order-top-num"><div className="order-top-num-left">주문번호 : </div><div className="order-top-num-right">{o.orderCode}</div></div>
                  <div className="order-title">🛒주문상품</div>
                </div>

                {o.orderDetails?.map((d) => (
                  <div key={d.id} className="order-item">
                    <img className="order-img" src={`/images/productImages/${d.product?.imageUrl}`} alt="" />
                    <div className="order-info">
                      <div className="name">{d.product?.productName}</div>
                      <div className="qty">{d.qty}개</div>
                      <div className="price">{d.product?.price?.toLocaleString()}원</div>
                    </div>
                  </div>
                ))}
                <div className="order-title">📦 주문 정보</div>

                <div className="order-info-box">
                  <div className="order-info-detail"><div className="order-info-left">배송상태 : </div><div className="order-info-right">{statusLabel(o.deliveryStatus)}</div></div>
                  <div className="order-info-detail"><div className="order-info-left">주문일자 : </div><div className="order-info-right">{new Date(o.odate).toLocaleString()}</div></div>

                  {o.deliveryStatus === "READY" && (
                    <div className="order-info-detail"><div className="order-info-left">출발 예정 : </div><div className="order-info-right">{getEta(o.odate)}</div></div>
                  )}

                  {o.deliveryStatus === "SHIPPING" && (
                    <div className="order-info-detail"><div className="order-info-left">도착 예정 : </div><div className="order-info-right">{o.eta ? new Date(o.eta).toLocaleString() : getEta(o.odate)}</div></div>
                  )}

                  {o.deliveryStatus === "DELIVERED" && (
                    <div className="order-info-detail"><div className="order-info-left">배송 완료일 : </div><div className="order-info-right">{o.deliveredAt ? new Date(o.deliveredAt).toLocaleString() : new Date(o.odate).toLocaleString()}</div></div>
                  )}
                </div>

              </div>
            );
          }

          return (
            <div
              key={idx}
              className={`chat-message ${msg.from === "me" ? "me" : "bot"}`}
            >
              {msg.text}
            </div>
          );
        })}

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
