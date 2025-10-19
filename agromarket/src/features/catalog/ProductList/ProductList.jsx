// // src/pages/Home.jsx
// import React, { useEffect, useState } from "react";
// import { axiosGet } from "shared/lib/axiosInstance";
// import ProductCard from "shared/ui/productList/ProductCard";
// import "./ProductList.scss";

// export default function ProductList({ title = "제품", limit = 4}) {
//   const [items, setItems] = useState([]);

//  useEffect(() => {
//     const fetchData = async () => {
//       const result = await axiosGet("/data/foodData.json");

//       if (result?.foodData && Array.isArray(result.foodData)) {
//         // 10개 중 limit개만 잘라서 보여주기
//         const slicedData = result.foodData.slice(0, limit);
//         setItems(slicedData);
//       } else {
//         console.warn("데이터가 없습니다:", result);
//       }
//     };
//     fetchData();
//   }, [limit])



//   return (
//     <div className="home-page">
//       <h2 className="section-title">{title}</h2>

//       <div className="product-grid">
//         {items.length > 0 ? (
//           items.map((item, idx) => <ProductCard key={idx} item={item} />)
//         ) : (
//           <p>데이터를 불러오는 중입니다...</p>
//         )}
//       </div>
//     </div>
//   );
// }









import React, { useEffect, useState, useRef } from "react";
import { axiosGet } from "shared/lib/axiosInstance";
import ProductCard from "shared/ui/productList/ProductCard";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import "./ProductList.scss";

export default function ProductList({ title = "오늘의 특가", limit = 12 }) {
  const [items, setItems] = useState([]);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const velocity = useRef(0);
  const momentumId = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosGet("/data/foodData.json");
      if (result?.foodData && Array.isArray(result.foodData)) {
        setItems(result.foodData.slice(0, limit));
      }
    };
    fetchData();
  }, [limit]);

  const stopMomentum = () => cancelAnimationFrame(momentumId.current);

  const startMomentum = () => {
    const el = sliderRef.current;
    const animate = () => {
      el.scrollLeft -= velocity.current;
      velocity.current *= 0.95;
      if (Math.abs(velocity.current) > 0.1) momentumId.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const handleMouseDown = (e) => {
    stopMomentum();
    isDragging.current = true;
    prevX.current = e.pageX;
    sliderRef.current.classList.add("dragging");
    sliderRef.current.querySelectorAll("*").forEach((el) => (el.style.pointerEvents = "none"));
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = sliderRef.current;
    const delta = e.pageX - prevX.current;
    prevX.current = e.pageX;
    el.scrollLeft -= delta;
    velocity.current = delta;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    sliderRef.current.classList.remove("dragging");
    sliderRef.current.querySelectorAll("*").forEach((el) => (el.style.pointerEvents = "auto"));
    startMomentum();
  };

  const handleMouseLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    sliderRef.current.classList.remove("dragging");
    sliderRef.current.querySelectorAll("*").forEach((el) => (el.style.pointerEvents = "auto"));
    startMomentum();
  };

  const scrollByCards = (direction) => {
    const el = sliderRef.current;
    const slideWidth = el.querySelector(".slide").offsetWidth + 24;
    const scrollAmount = slideWidth * 4;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="home-page">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <button className="view-all-btn">전체보기 &gt;</button>
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
          {items.map((item, idx) => (
            <div className="slide" key={idx}>
              <ProductCard item={item} />
            </div>
          ))}
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
