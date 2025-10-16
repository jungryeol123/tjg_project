import React from "react";
import "./ProductCard.scss";

export default function ProductCard({ item }) {
  // 할인된 가격 계산
  const discountedPrice = item.dc
    ? Math.floor(item.price * (1 - item.dc / 100))
    : null;

  return (
    <div className="product-card">
      <div className="image-box">
        {item.isHotDeal && <span className="badge hot">원딜핫딜</span>}
        {item.isMemberSpecial && <span className="badge member">멤버특가</span>}
        <img
          src={item.imageUrl}
          alt={item.imageUrl_name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">
          [{item.brandName}] <span>{item.productName}</span>
        </h3>

        <div className="price-wrap">
          {item.dc ? (
            <>
              <span className="discount">{item.dc}%</span>
              <span className="discounted-price">
                {discountedPrice.toLocaleString()}원
              </span>
              <span className="original-price">
                {item.price.toLocaleString()}원
              </span>
            </>
          ) : (
            <span className="no-price">가격 정보 없음</span>
          )}
        </div>

        <button className="cart-btn">🛒 담기</button>
      </div>
    </div>
  );
}
