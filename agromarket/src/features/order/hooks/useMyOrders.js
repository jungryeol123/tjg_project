import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { api } from "shared/lib/axios";
import { addCart } from "features/cart/cartAPI";
import { useDispatch } from "react-redux";

export function useMyOrders(userId) {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await api.get(`/orders/my/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("주문 조회 실패:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleDeleteOrder = async (orderCode) => {
    try {
      await api.delete(`/orders/deleteOrder/${userId}/${orderCode}`);

      Swal.fire({
        icon: "success",
        title: "삭제 완료",
        text: "주문 내역이 삭제되었습니다."
      });

      setOrders((prev) => prev.filter((o) => o.orderCode !== orderCode));
    } catch {
      Swal.fire({ icon: "error", title: "삭제 실패" });
    }
  };

  const handleAddCart = async (item) => {
    const isNew = await dispatch(addCart(item.ppk, 1));
    Swal.fire({
      icon: "success",
      title: "장바구니",
      text: isNew
        ? `${item.productName}이 장바구니에 추가되었습니다.`
        : `${item.productName} 수량이 증가했습니다.`
    });
  };

  const currentItems = orders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return { orders, currentItems, page, setPage, itemsPerPage, handleDeleteOrder, handleAddCart };
}
