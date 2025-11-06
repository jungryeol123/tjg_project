import { useEffect, useState } from "react";
import axios from "axios";
import { parseJwt } from "features/auth/parseJwt";

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // ✅ 테스트용 사용자 id (나중엔 토큰으로 대체)



  // useEffect(() => {
  //   // ✅ 1️⃣ 로그인 정보 먼저 읽기
  //   const stored = localStorage.getItem("loginInfo");
  //   if (stored) {
  //     const parsed = JSON.parse(stored);
  //     setUserId(parsed.id);
  //   }
  // }, []); // 처음 한 번만 실행

  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);
      console.log("토큰 payload:", payload); // { id: 7, iat: ..., exp: ... }

      setUserId(payload.id); // ✅ 토큰 안의 id를 그대로 사용
    }

  }, []);




  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/orders/my/${userId}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("주문 내역 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);
  console.log("orders", orders);

  if (loading) return <p>⌛ 주문 내역을 불러오는 중...</p>;
  if (orders.length === 0) return <p>🛒 아직 주문 내역이 없습니다.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧾 내 주문 내역</h2>

      {orders && orders.map((order) => (
        <div key={order.id} style={styles.card}>
          <div style={styles.header}>
            <h3>주문번호: {order.orderCode}</h3>
            <p style={styles.date}>
              주문일자: {new Date(order.odate).toLocaleString()}
            </p>
          </div>

          <div style={styles.body}>
            <p>
              <b>수령인:</b> {order.receiverName} / {order.receiverPhone}
            </p>
            <p>
              <b>주소:</b> {order.address1} {order.address2} ({order.zipcode})
            </p>
            <p>
              <b>결제 금액:</b> {order.totalAmount.toLocaleString()}원
            </p>

            <h4 style={{ marginTop: "10px" }}>📦 주문 상품</h4>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {order.orderDetails.map((item) => (
                <li key={item.id}>
                  <span>{item.productName}</span> — <b>{item.qty}</b>개 /{" "}
                  {item.price.toLocaleString()}원
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    fontFamily: "'Pretendard', sans-serif",
  },
  title: {
    marginBottom: "24px",
    color: "#4B3EFF",
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  header: {
    borderBottom: "1px solid #eee",
    marginBottom: "12px",
    paddingBottom: "8px",
  },
  date: {
    fontSize: "0.9rem",
    color: "#555",
  },
  body: {
    fontSize: "1rem",
    lineHeight: "1.6",
  },
};
