import React from "react";
import "./ProductCard.scss";

export default function ProductCard({ item }) {
  // 할인된 가격 계산
  const discountedPrice = item.dc
    ? Math.floor(item.price * ((100 - item.dc) / 100))
    : null;

  return (
    <div className="product-card">
      {/* ✅ 뱃지 */}
      <div
        className={`badge-container ${
          item.hotDeal && item.memberSpecial ? "multi" : ""
        }`}
      >
        {item.hotDeal && <span className="badge hot">원딜핫딜</span>}
        {item.memberSpecial && <span className="badge member">멤버특가</span>}
      </div>

      <div className="image-container">
        {/* ✅ 제품 이미지 */}
        <img
          src={`/images/productImages/${item.imageUrl}`}
          alt={item.imageUrl_name}
          className="product-image"
          draggable="false"
        />
        { item.count <= 0 && <div class="sold-out">SOLD OUT</div> }
      </div>

      {/* ✅ 제품 정보 */}
      <div className="product-info">
        <h3 className="product-name">
          [{item.brandName}] <span>{item.productName}</span>
        </h3>
        <div className="price-wrap">
          {item.dc ? (
            <>
              <span className="discount">{item.dc}%</span>
              <span className="discounted-price">
                {discountedPrice?.toLocaleString()}원
              </span>
              <span className="original-price">
                {item.price?.toLocaleString()}원
              </span>
            </>
          ) : (
              <span className="or-price">{item.price?.toLocaleString()}원</span>   
          )}
        </div>
        {/* <button className="cart-btn">🛒 담기</button> */}
      </div>
    </div>
  );
}

