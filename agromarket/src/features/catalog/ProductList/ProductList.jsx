// import React, { useEffect, useState, useRef } from "react";
// import { axiosGet } from "shared/lib/axiosInstance";
// import ProductCard from "shared/ui/productList/ProductCard";
// import {
//   MdOutlineArrowForwardIos,
//   MdOutlineArrowBackIosNew,
// } from "react-icons/md";
// import "./ProductList.scss";
// import { Link } from "react-router-dom";

// export default function ProductList({ title = "오늘의 특가", limit = 12 }) {
//   const [items, setItems] = useState([]);
//   const sliderRef = useRef(null);
//   const isDragging = useRef(false);
//   const prevX = useRef(0);
//   const velocity = useRef(0);
//   const momentumId = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axiosGet("/data/foodData.json");
//       if (result?.foodData && Array.isArray(result.foodData)) {
//         setItems(result.foodData.slice(0, limit));
//       }
//     };
//     fetchData();
//   }, [limit]);

//   const stopMomentum = () => cancelAnimationFrame(momentumId.current);

//   const startMomentum = () => {
//     const el = sliderRef.current;
//     const animate = () => {
//       el.scrollLeft -= velocity.current;
//       velocity.current *= 0.95;
//       if (Math.abs(velocity.current) > 0.1)
//         momentumId.current = requestAnimationFrame(animate);
//     };
//     animate();
//   };

//   const handleMouseDown = (e) => {
//     stopMomentum();
//     isDragging.current = true;
//     prevX.current = e.pageX;
//     sliderRef.current.classList.add("dragging");
//     sliderRef.current
//       .querySelectorAll("*")
//       .forEach((el) => (el.style.pointerEvents = "none"));
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging.current) return;
//     e.preventDefault();
//     const el = sliderRef.current;
//     const delta = e.pageX - prevX.current;
//     prevX.current = e.pageX;
//     el.scrollLeft -= delta;
//     velocity.current = delta;
//   };

//   const handleMouseUp = () => {
//     if (!isDragging.current) return;
//     isDragging.current = false;
//     sliderRef.current.classList.remove("dragging");
//     sliderRef.current
//       .querySelectorAll("*")
//       .forEach((el) => (el.style.pointerEvents = "auto"));
//     startMomentum();
//   };


//   const scrollByCards = (direction) => {
//     const el = sliderRef.current;
//     const slideWidth = el.querySelector(".slide").offsetWidth + 24;
//     const scrollAmount = slideWidth * 4;
//     el.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };


//   return (
//     <section className="home-page">
//       <div className="section-header">
//         <div></div>
//         <h2 className="section-title">{title}</h2>
//         <button className="view-all-btn">전체보기 &gt;</button>
//       </div>

//       <div className="slider-wrapper">
//         <button
//           className="nav-button left"
//           onClick={() => scrollByCards("left")}
//           aria-label="이전"
//         >
//           <MdOutlineArrowBackIosNew />
//         </button>

//         <div
//           className="slider-container"
//           ref={sliderRef}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           // onMouseLeave={handleMouseLeave}
//         >
//           <div className="slides">
//             {items.map((item, idx) => (
//               // <div className="slide" key={idx}>
//               //   <ProductCard item={item} />
//               // </div>
//                  <Link to={`/products/${item.pid}`} className="slide" key={idx}  draggable="false">
//                 <ProductCard item={item} />
//               </Link>
//             ))}
//           </div>
//         </div>

//         <button
//           className="nav-button right"
//           onClick={() => scrollByCards("right")}
//           aria-label="다음"
//         >
//           <MdOutlineArrowForwardIos />
//         </button>
//       </div>
//     </section>
//   );
// }




import React, { useEffect, useState, useRef } from "react";
import { axiosGet } from "shared/lib/axiosInstance";
import ProductCard from "shared/ui/productList/ProductCard";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import "./ProductList.scss";
import { Link } from "react-router-dom";

export default function ProductList({ title = "오늘의 특가", limit = 12 }) {
  const [items, setItems] = useState([]);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const velocity = useRef(0);
  const momentumId = useRef(null);
  const totalMoved = useRef(0);
  const dragPreventClick = useRef(false);
  const dragThreshold = 5; // 클릭으로 인식할 최대 이동 거리(px)

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
    const scrollAmount = slideWidth * 4;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="home-page">
      <div className="section-header">
        <div></div>
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
          <div className="slides">
            {items.map((item, idx) => (
              <Link
                to={`/products/${item.pid}`}
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
