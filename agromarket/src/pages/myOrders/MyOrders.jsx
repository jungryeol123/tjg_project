import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// features
import { parseJwt } from "features/auth/parseJwt";
import { addCart } from "features/cart/cartAPI.js";
// shared
import { api } from 'shared/lib/axios.js';
import './MyOrders.css'

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const handleNext = () => {
    setCurrentPage((prev) =>
      prev * itemsPerPage < orders.length ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // ✅ 페이지네이션 처리
  const currentItems = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /** 🔹 로그인 ID 읽기 */
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
        const res = await api.get(`http://localhost:8080/orders/my/${userId}`);
        console.log(res.data);
        
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
      try {
        const res = await api.get(`/coupon/my/${userId}`);
        const couponList = res.data.filter(item => item.isUsed === false)

        console.log("🔥 백엔드 응답:", res.data);
        setCoupons(Array.isArray(couponList) ? couponList : []);
      } catch (err) {
        console.error("쿠폰 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [userId]);

  /** 주문내역 삭제 기능 */
  const handleDeleteOrder = async (orderCode) => {
    try {
      const res = await api.delete(
        `/orders/deleteOrder/${userId}/${orderCode}`,
        {
        data : {},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ★ 추가
        }
      });

      if (res.status === 200) {
        Swal.fire({
                icon: 'success',
                title: '✅삭제 완료',
                text: "주문 내역이 삭제되었습니다.",
                confirmButtonText: '확인'
              });
        setOrders(orders.filter((o) => o.orderCode !== orderCode));
      }
    } catch (err) {
      Swal.fire({
              icon: 'error',
              title: '⚠ 삭제 실패',
              text: "주문 내역 삭제에 실패했습니다.!",
              confirmButtonText: '확인'
            });;
    }
  };

  /** 🔹 쿠폰 삭제 기능 */
  const handleDeleteCoupon = async (couponId) => {
    try {
      const res = await api.delete(
        `/coupon/deleteCoupon/${userId}/${couponId}`
      );

      if (res.status === 200) {
        Swal.fire({
                icon: 'success',
                title: '✅삭제 완료',
                text: "쿠폰이 삭제 되었습니다.",
                confirmButtonText: '확인'
              });;

        // 🔄 화면에서도 즉시 삭제
        setCoupons(coupons.filter((c) => c.coupon.couponId !== couponId));
      }
    } catch (err) {
      Swal.fire({
              icon: 'error',
              title: '⚠ 삭제 실패',
              text: "쿠폰 삭제에 실패했습니다.",
              confirmButtonText: '확인'
            });;
    }
  };

  const handleAddCart = async(item) => {
    const isNew = await dispatch(addCart(item.ppk, 1));

    // 신규 상품 등록시
    if (isNew) {
      // 장바구니 확인
      Swal.fire({
        icon: 'success',
        title: '✅ 장바구니 등록',
        text: item.productName + "가 장바구니에 등록이 완료되었습니다.",
        confirmButtonText: '확인'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '✅ 장바구니 등록',
        text: item.productName + "의 수량이 증가 되었습니다.",
        confirmButtonText: '확인'
      });
    }
  }

  if (loading) return <p>⌛ 데이터 불러오는 중...</p>;

  return (
    <div className="mypage-container">
      <h2 className="mypage-title">🧾 내 주문 내역</h2>

      {/* 주문 내역 */}
      {orders.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        currentItems.map((order) => (
          <div key={order.id} className="mypage-card">

            <div className="mypage-body">
              <div className="mypage-order-title">
                <h4 className="mypage-order-title-name">📦 주문 상품</h4>
                <div className="mypage-order-date">
                  <b>주문일자:</b> {new Date(order.odate).toLocaleString()}
                  <p className="mypage-order-code"><b>주문 번호:</b> {order.orderCode}</p>
                </div>
              </div>
              <ul>
                {order.orderDetails.map((item) => (
                  <li className="mypage-product-list" key={item.id}>
                    <div className="mypage-product-img-container">
                      <img className="mypage-product-img" src={`/images/productImages/${item.product.imageUrl}`} alt="product" />
                      { item.product.count === 0 && <div class="sold-out">SOLD OUT</div> }
                    </div>
                    <div className="mypage-product-info">
                      <div>
                        {item.productName}
                      </div>
                        {item.price.toLocaleString()}원 · <b>{item.qty}</b>개
                    </div>
                    <div className="mypage-btn">
                      <button onClick={() => {navigate(`/products/${item.ppk}`)}}>상품 바로가기</button>
                      <button onClick={() => {handleAddCart(item)}} disabled={item.product.count === 0}>장바구니</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mypage-info">
                <p><b>수령인:</b> {order.receiverName} / {order.receiverPhone}</p>
                <p><b>주소:</b> {order.address1} {order.address2} ({order.zipcode})</p>
                <p><b>결제 금액:</b> {order.totalAmount.toLocaleString()}원</p>
              </div>

            </div>
            <div className="mypage-body">
              <p>
              </p>
            </div>
                <button
                  className="mypage-deleteBtn"
                  onClick={() => handleDeleteOrder(order.orderCode)}
                >
                    삭제
                </button>
          </div>
        ))
      )}
      {/* ✅ 페이지네이션 */}
      {orders.length>0 && 
        <div className="pagination">
          <button className="pagination-btn" onClick={handlePrev} disabled={currentPage === 1}>
            {"<"}
          </button>
          <span style={{ margin: "0 0.6rem" }}>
            {currentPage} / {Math.ceil(orders.length / itemsPerPage)}
          </span>
          <button className="pagination-btn"
            onClick={handleNext}
            disabled={currentPage * itemsPerPage >= orders.length}
          >
            {">"}
          </button>
        </div>
      }

      {/* 받은 쿠폰 목록 */}
      <div>
        <h2 className="mypage-title">🎟️ 받은 쿠폰</h2>

        {coupons.length === 0 ? (
          <p>받은 쿠폰이 없습니다.</p>
        ) : (
          <ul className="mypage-couponList">
          
            { coupons.map((c) => (
              <li key={c.id} className="mypage-couponItem">
                <span>
                  <b>{c.coupon.couponDcRate}% 할인 쿠폰</b> — 수량: {c.qty}
                </span>
                <button
                  className="mypage-deleteBtn"
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