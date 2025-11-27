import axios from "axios";
import { useState, useEffect } from "react";
import { parseJwt } from "features/auth/parseJwt";

export function AddressModal({ onClose, onSelectAddress }) {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);

      setUserId(payload.id); // ✅ 토큰 안의 id를 그대로 사용
    }

  }, []);

  /** 🔹 주문 내역 조회 */
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/orders/my/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("주문 내역 조회 실패:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalBox = {
    backgroundColor: "#fff",
    width: "500px",
    maxHeight: "80vh",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const header = {
    padding: "16px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const content = {
    padding: "16px",
    overflowY: "auto",
    flexGrow: 1,
  };

  const handleSelect = (order) => {
    onSelectAddress(order);
    onClose();
  }

  return (
    <div style={overlay}>
      <div style={modalBox}>
        <div style={header}>
          <h2>배송지 선택</h2>
          <button onClick={onClose}>X</button>
        </div>

        <div style={content}>
          {/* 주소 리스트 스크롤 영역 */}
          {orders.length === 0 ? 
            <ul className="address-modal-group">
              <li>아직 주문 내역이 없습니다.</li>
              <li>첫 주문을 시작해보세요!</li>
            </ul>
          : 
            orders.map(order => 
              <ul className="address-modal-group">
                <li className="address-modal-name">{order.receiverName}</li>
                <li className="address-modal-address">({order.zipcode}){order.address1}{order.address2}</li>
                <li className="address-modal-phone">{order.receiverPhone}</li>
                <li className="address-modal-memo">{order.memo}</li>
                <button onClick={() => handleSelect(order)}>선택</button>
              </ul>)}
        </div>
      </div>
    </div>
  );
}
