import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function ProductList() {
  const [isWish, setIsWish] = useState(false);
     const [imgList, setImgList] = useState([]); // 선택한 상품의 이미지 리스트

  // useEffect( () => {
  //     const fillter = async () => {
        
  //         await getProduct();

  //         const jsonData = await getJsonData("/data/data.json");
  //         const [fdata] = await jsonData.filter( data => data.pid === pid);
      
  //         setCatalog(fdata);
  //         setImgList(fdata.imgList);
  //     }
  //     fillter();

  // }, [pid]);

  const imageList = [
    "https://mullang.com/web/product/medium/202508/2e573acc55dfc944c4af57f5029fe4c5.jpg",
    "https://img-cf.kurly.com/shop/data/goods/1669185057114l1.jpg",
    "https://img-cf.kurly.com/shop/data/goods/1669185057114l2.jpg",
    "https://img-cf.kurly.com/shop/data/goods/1669185057114l3.jpg",
  ];

  const [mainImage, setMainImage] = useState(imageList[0]);

  return (
    <div className="product-detail">
      <div className="product-container">
        {/* 왼쪽 상품 이미지 */}
        <div className="product-left">
          <img src={mainImage} alt="상품 메인" className="product-image" />

          {/* ✅ 썸네일 리스트 */}
          <div className="thumbnail-list">
            {imageList.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`썸네일-${index}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="product-brand">
            <img
              src="https://img-cf.kurly.com/shop/data/brand/brand_samihun.png"
              alt="브랜드 로고"
              className="brand-logo"
            />
            <div className="brand-info">
              <p className="brand-name">사미헌</p>
              <p className="brand-desc">부산 서면의 소고기 명가</p>
            </div>
          </div>
          <div className="product-view-count">
            이 상품을 <strong>8,791명</strong>이 보고 있어요
          </div>
        </div>

        {/* 오른쪽 상품 정보 */}
        <div className="product-right">
          <p className="product-category">샛별배송 | 사미헌</p>
          <h2 className="product-title">[사미헌] 갈비탕</h2>
          <p className="product-subtitle">진한 갈비로 우려낸 전통 갈비탕</p>
          <p className="product-origin">
            원산지: 상품설명/상세정보 참조
          </p>

          <div className="product-price">
            <p className="product-price-discount">
              <span className="discount-percent">10%</span>{" "}
              <span className="discount-current">11,700원</span>{" "}
              <span className="discount-original">13,000원</span>
            </p>
            <p className="product-price-bottom">
              <span className="discount-strong">48%</span>{" "}
              <span className="discount-low">6,700원~</span>
            </p>
            <button className="coupon-btn">
              첫구매 쿠폰 받고 6,700원~에 구매하기
            </button>
          </div>

          <table className="product-info-table">
            <tbody>
              <tr>
                <th>배송</th>
                <td>
                  샛별배송<br />
                  23시 전 주문 시 수도권/충청 내일 아침 7시 전 도착
                </td>
              </tr>
              <tr>
                <th>판매자</th>
                <td>컬리</td>
              </tr>
              <tr>
                <th>포장타입</th>
                <td>냉동 (종이포장)</td>
              </tr>
              <tr>
                <th>판매단위</th>
                <td>1팩</td>
              </tr>
              <tr>
                <th>중량/용량</th>
                <td>1KG</td>
              </tr>
              <tr>
                <th>알레르기정보</th>
                <td>소고기, 대두, 밀, 우유 함유</td>
              </tr>
              <tr>
                <th>안내사항</th>
                <td>뼈조각이 있을 수 있으니 섭취 시 주의바랍니다.</td>
              </tr>
            </tbody>
          </table>

          <div className="purchase-section">
            <select className="purchase-select">
              <option>상품을 선택해주세요</option>
            </select>

            <div className="purchase-footer">
              <div className="total-price">
                <span>총 상품금액:</span>
                <strong>0원</strong>
              </div>
              <div className="button-group">
                <button
                  className={`wish-btn ${isWish ? "active" : ""}`}
                  onClick={() => setIsWish(!isWish)}
                >
                  {isWish ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
                </button>
                <button className="cart-btn">장바구니 담기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}