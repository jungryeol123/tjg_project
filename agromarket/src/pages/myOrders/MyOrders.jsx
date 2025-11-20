
import { useEffect, useState } from "react";
import axios from "axios";
import { parseJwt } from "features/auth/parseJwt";

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  
  // /** 🔹 로그인 ID 읽기 */
  // useEffect(() => {
  //   const stored = localStorage.getItem("loginInfo");
  //   if (stored) {
  //     const parsed = JSON.parse(stored);
  //     setUserId(parsed.id); // Long id 저장
  //   }
  // }, []);
  
  useEffect(() => {
      const stored = localStorage.getItem("loginInfo");
      if (stored) {
        const { accessToken } = JSON.parse(stored);
        const payload = parseJwt(accessToken);
        console.log("토큰 payload:", payload); // { id: 7, iat: ..., exp: ... }
  
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

  /** 🔹 쿠폰 목록 조회 */
useEffect(() => {
  if (!userId) return;

  const fetchCoupons = async () => {
    console.log("쿠폰조회 userId", userId);

    try {
      // 🔥 loginInfo 안에서 token 가져오기
      const stored = localStorage.getItem("loginInfo");
      const parsed = stored ? JSON.parse(stored) : null;
      const token = parsed?.token || null;

      console.log("요청 URL:", `http://localhost:8080/coupon/my/${userId}`);


      const res = await axios.get(`/coupon/my/${userId}`);

      console.log("🔥 백엔드 응답:", res.data);
      setCoupons(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("쿠폰 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCoupons();
}, [userId]);



  /** 🔹 쿠폰 삭제 기능 */
  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm("정말 쿠폰을 삭제하시겠습니까?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:8080/coupon/delete/${userId}/${couponId}`
      );

      if (res.status === 200) {
        alert("쿠폰이 삭제되었습니다.");

        // 🔄 화면에서도 즉시 삭제
        setCoupons(coupons.filter((c) => c.coupon.couponId !== couponId));
      }
    } catch (err) {
      console.error("쿠폰 삭제 실패:", err);
      alert("쿠폰 삭제 실패!");
    }
  };

  if (loading) return <p>⌛ 데이터 불러오는 중...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧾 내 주문 내역</h2>

      {/* 주문 내역 */}
      {orders.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={styles.card}>
            <div style={styles.header}>
              <h3>주문번호: {order.orderCode}</h3>
              <p style={styles.date}>
                주문일자: {new Date(order.odate).toLocaleString()}
              </p>
            </div>

            <div style={styles.body}>
              <p><b>수령인:</b> {order.receiverName} / {order.receiverPhone}</p>
              <p><b>주소:</b> {order.address1} {order.address2} ({order.zipcode})</p>
              <p><b>결제 금액:</b> {order.totalAmount.toLocaleString()}원</p>

              <h4 style={{ marginTop: "10px" }}>📦 주문 상품</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {order.orderDetails.map((item) => (
                  <li key={item.id}>
                    {item.productName} — <b>{item.qty}</b>개 /{" "}
                    {item.price.toLocaleString()}원
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}

      {/* 받은 쿠폰 목록 */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={styles.title}>🎟️ 받은 쿠폰</h2>

        {coupons.length === 0 ? (
          <p>받은 쿠폰이 없습니다.</p>
        ) : (
          <ul style={styles.couponList}>
            {coupons.map((c) => (
              <li key={c.id} style={styles.couponItem}>
                <span>
                  <b>{c.coupon.couponDcRate}% 할인 쿠폰</b> — 수량: {c.qty}
                </span>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteCoupon(c.coupon.couponId)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
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
  couponList: {
    listStyle: "none",
    padding: 0,
  },
  couponItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "10px",
    background: "#fafafa",
  },
  deleteBtn: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
