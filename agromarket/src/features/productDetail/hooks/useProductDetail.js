// features/productDetail/hooks/useProductDetail.js
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { addCart } from "features/cart/cartAPI";
import { parseJwt } from "features/auth/parseJwt";
import { setProductAPI } from "features/product/productAPI";
import { saveViewLog } from "../api/productDetailAPI";

export function useProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const product = useSelector((state) => state.product.product);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [count, setCount] = useState(1);
  const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);

  // 탭 ref
  const sectionRefs = {
    item: useRef(null),
    detail: useRef(null),
    review: useRef(null),
    qna: useRef(null),
    return: useRef(null),
  };

  // 상품 상세 불러오기
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setProductAPI(id));
      setIsFirstEffectComplete(true);
    };
    fetchData();
  }, [id]);

  // 조회 로그 저장
  useEffect(() => {
    if (!isFirstEffectComplete) return;
    const stored = localStorage.getItem("loginInfo");
    if (!stored) return;

    const { accessToken } = JSON.parse(stored);
    const payload = parseJwt(accessToken);

    saveViewLog({
      upk: payload.id,
      ppk: Number(id),
      categorySubId: product.categorySubId,
    });

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [isFirstEffectComplete]);

  // 수량 감소
  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  // 수량 증가
  const handleIncrease = () => {
    if (count < product.count) setCount(count + 1);
  };

  // 직접 입력
  const handleChange = (e) => {
    let num = parseInt(e.target.value.replace(/[^0-9]/g, "")) || 1;
    if (num < 1) num = 1;
    if (num > product.count) num = product.count;
    setCount(num);
  };

  // 장바구니
  const handleAddCart = async () => {
    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "⚠ 로그인 필요",
        text: "로그인이 필요합니다.",
      }).then(() =>
        navigate("/login", { state: { from: location.pathname } })
      );
      return;
    }

    const isNew = await dispatch(addCart(id, count));

    Swal.fire({
      icon: "success",
      title: "장바구니 등록",
      text: isNew
        ? `${product.productName}가 장바구니에 추가되었습니다.`
        : `${product.productName}의 수량이 증가했습니다.`,
    });
  };

  // 탭 이동
  const handleTabClick = (name) => {
    const section = sectionRefs[name].current;
    if (section) section.scrollIntoView({ block: "start" });
  };

  const salesPrice = Math.floor(product.price * ((100 - product.dc) / 100));

  return {
    product,
    count,
    handleIncrease,
    handleDecrease,
    handleChange,
    handleAddCart,
    sectionRefs,
    handleTabClick,
    salesPrice,
  };
}
