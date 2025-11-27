import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useMemo, memo } from "react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
// shared
import "./ProductList.scss";
import ProductCard from "../productCard/ProductCard";

 function ProductList({ title = "오늘의 특가", limit = 20, keyword }) {
  const productList = useSelector((state) => state.product.productList );
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const velocity = useRef(0);
  const momentumId = useRef(null);
  const totalMoved = useRef(0);
  const dragPreventClick = useRef(false);
  const dragThreshold = 5; // 클릭으로 인식할 최대 이동 거리(px)
  const navigate = useNavigate();

  // ✅ 필터 조건 분기
  const productFilterList = useMemo(() => {
    if (!productList || productList.length === 0) return [];

    switch (keyword) {
      case "time": // 오래된 순 (등록일 기준 오름차순)
        return [...productList]
          .sort(
            (a, b) =>
              new Date(a.productDate) - new Date(b.productDate)
          )
          .slice(0, limit);

      case "sale": // 할인율 10% 이상
        return productList
          .filter((item) => item.dc >= 10)
          .sort((a, b) => b.dc - a.dc)
          .slice(0, limit);

      default: // 기본값 (그냥 전체)
        return productList.slice(0, limit);
    }
  }, [productList, keyword, limit]);

  const stopMomentum = () => cancelAnimationFrame(momentumId.current);

  const startMomentum = () => {
    const el = sliderRef.current;
    const animate = () => {
      el.scrollLeft -= velocity.current;
      velocity.current *= 0.95; // 감속
      if (Math.abs(velocity.current) > 0.1)
        momentumId.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const handleMouseDown = (e) => {
    stopMomentum();
    isDragging.current = true;
    prevX.current = e.pageX;
    velocity.current = 0;
    totalMoved.current = 0;
    dragPreventClick.current = false; // 드래그 시작 시 클릭 허용 상태 초기화
    sliderRef.current.classList.add("dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = sliderRef.current;
    const delta = e.pageX - prevX.current;
    prevX.current = e.pageX;
    totalMoved.current += Math.abs(delta);

    // 일정 거리 이상 움직이면 클릭 차단 모드
    if (totalMoved.current > dragThreshold) {
      dragPreventClick.current = true;
    }

    el.scrollLeft -= delta;
    velocity.current = delta;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    sliderRef.current.classList.remove("dragging");
    startMomentum(); // 손을 떼면 관성으로 감속
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      sliderRef.current.classList.remove("dragging");
      startMomentum();
    }
  };

  const scrollByCards = (direction) => {
    const el = sliderRef.current;
    const slideWidth = el.querySelector(".slide").offsetWidth + 24;
    const scrollAmount = slideWidth * 5;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  
  // 전체보기
  const handleAllView = () => {
    // url 설정
    const url = "/productList/" + keyword;
    navigate(url);
  }

  return (
    <section className="home-page">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <button className="view-all-btn" onClick={ handleAllView }>전체보기 &gt;</button>
      </div>

      <div className="slider-wrapper">
        <button
          className="nav-button left"
          onClick={() => scrollByCards("left")}
          aria-label="이전"
        >
          <MdOutlineArrowBackIosNew />
        </button>

        <div
          className="slider-container"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="slides">
            {productFilterList && productFilterList.map((item, idx) => (
              <Link
                to={`/products/${item.id}`}
                className="slide"
                key={idx}
                draggable="false"
                // ✅ 드래그 중 클릭 방지
                onClick={(e) => {
                  if (dragPreventClick.current) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                <ProductCard item={item} />
              </Link>
            ))}
          </div>
        </div>

        <button
          className="nav-button right"
          onClick={() => scrollByCards("right")}
          aria-label="다음"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </section>
  );
}

export default memo(ProductList);