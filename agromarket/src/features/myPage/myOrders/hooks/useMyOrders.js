// features/order/hooks/useMyOrders.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { parseJwt } from "features/auth/parseJwt";
import { orderAPI } from "../api/orderAPI";

export function useMyOrders(itemsPerPage = 4) {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  /** 로그인 ID 읽기 */
  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (stored) {
      const { accessToken } = JSON.parse(stored);
      const payload = parseJwt(accessToken);
      setUserId(payload.id);
    }
  }, []);

  /** 주문 조회 */
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await orderAPI.getMyOrders(userId);
        setOrders(res.data);
      } catch (err) {
        console.error("주문 조회 실패:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  /** 주문 삭제 */
  const deleteOrder = async (orderCode) => {
    try {
      const res = await orderAPI.deleteOrder(userId, orderCode);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "삭제 완료",
          text: "주문이 삭제되었습니다.",
        });

        setOrders((prev) =>
          prev.filter((order) => order.orderCode !== orderCode)
        );
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "삭제 실패",
        text: "주문을 삭제할 수 없습니다.",
      });
    }
  };

  /** 페이지네이션 */
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const currentItems = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return {
    userId,
    orders,
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    deleteOrder,
    setOrders,
  };
}
