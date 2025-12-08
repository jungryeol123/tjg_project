// useAdminProducts.js
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { parseJwt } from "features/auth/parseJwt";
import { setProductListAPI, delProductData } from "features/product/productAPI";
import Swal from "sweetalert2";

export function useAdminProducts() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // 상품 최신화
  useEffect(() => {
    dispatch(setProductListAPI());
    setActiveFilter("");
  }, []);

  // 로그인한 유저 상품만 필터링
  const updateProducts = useMemo(() => {
    const loginInfo = localStorage.getItem("loginInfo");

    if (!loginInfo) return [];

    const { accessToken } = JSON.parse(loginInfo);
    const payload = parseJwt(accessToken);
    const upk = payload.id;

    if (!productList || productList.length === 0) return [];

    setLoading(false);

    return productList.filter((p) => p.user.id == upk);
  }, [productList]);

  useEffect(() => {
    setFilteredProducts(updateProducts);
  }, [updateProducts]);

  // 필터 클릭 로직
  const handleFilter = (type) => {
    setActiveFilter(type);

    let sorted = [];

    if (type === "new") {
      sorted = updateProducts.toSorted(
        (a, b) => new Date(b.productDate) - new Date(a.productDate)
      );
    } else if (type === "priceHigh") {
      sorted = updateProducts.toSorted((a, b) => b.price - a.price);
    } else if (type === "priceLow") {
      sorted = updateProducts.toSorted((a, b) => a.price - b.price);
    }

    setFilteredProducts(sorted);
  };

  // 삭제 로직
  const handleDelete = (productId) => {
    Swal.fire({
      icon: "warning",
      text: "상품을 정말 삭제 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        if (dispatch(delProductData(productId))) {
          Swal.fire({
            icon: "success",
            title: "상품 삭제 성공!",
            text: "상품이 성공적으로 삭제되었습니다.",
          }).then(() => dispatch(setProductListAPI()));
        } else {
          Swal.fire({
            icon: "error",
            title: "삭제 실패",
            text: "다시 시도해주세요.",
          });
        }
      }
    });
  };

  return {
    loading,
    activeFilter,
    filteredProducts,
    handleFilter,
    handleDelete,
    filterLabel: [
      { label: "최신순", value: "new" },
      { label: "높은가격순", value: "priceHigh" },
      { label: "낮은가격순", value: "priceLow" },
    ],
  };
}
