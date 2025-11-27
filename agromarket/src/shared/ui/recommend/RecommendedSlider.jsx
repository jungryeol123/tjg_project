import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useMemo } from "react";
import "./RecommendedSlider.scss";
import ProductCard from "../productCard/ProductCard";

export default function RecommendedSlider({ title = "추천 상품", limit = 20 }) {
  const productList = useSelector((state) => state.product.productList);
  const recentSubCategory = useSelector(
    (state) => state.product.recentSubCategory
  );

  const sliderRef = useRef(null);

  const filteredList = useMemo(() => {
    if (!recentSubCategory || !productList) return [];
    return productList
      .filter((item) => item.categorySub.id === recentSubCategory)
      .slice(0, limit);
  }, [productList, recentSubCategory, limit]);

  // ⭐ 리스트가 적어도 최소 8~10개는 되게 복제해줌
  const extendedList = useMemo(() => {
    if (filteredList.length === 0) return [];

    const minCount = 12; // 최소 12개 이상 확보해야 자연스럽게 구름
    let arr = [...filteredList];

    while (arr.length < minCount) {
      arr = [...arr, ...filteredList];
    }

    return arr.slice(0, minCount * 2); // 넉넉히 2배
  }, [filteredList]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    
    const scroll = () => {
      slider.scrollLeft += 0.8; // ★ 속도 증가 (0.4 → 0.8)

      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [extendedList]);

  if (extendedList.length === 0) return null;

  return (
    <section className="recommend-section">
      <h2 className="recommend-title">{title}</h2>

      <div className="recommend-slider" ref={sliderRef}>
        <div className="recommend-track">
          {extendedList.map((item, idx) => (
            <Link
              to={`/products/${item.id}`}
              className="recommend-item small-card"
              key={`${item.id}-${idx}`}
            >
              <ProductCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
