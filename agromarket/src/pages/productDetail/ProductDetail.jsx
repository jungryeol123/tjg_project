// import Swal from 'sweetalert2';
// import { useSelector, useDispatch } from "react-redux";
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
// // shared
// import { api } from 'shared/lib/axios';
// // features
// import { addCart } from "features/cart/cartAPI.js";
// import { QnA } from 'features/productDetail/qna/QnA';
// import { parseJwt } from "features/auth/parseJwt.js";
// import { Item } from 'features/productDetail/item/Item';
// import { Detail } from 'features/productDetail/Detail/Detail';
// import { Return } from 'features/productDetail/return/Return';
// import { setProductAPI } from "features/product/productAPI.js";
// import { ReviewList } from 'features/productDetail/review/ReviewList';
// import "./ProductDetail.scss";

// export function ProductDetail() {
//   const { id } = useParams(); // 선택한 상품의 상품번호(primarykey)
//   const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);
//   const [count, setCount] = useState(1); // 수량 관리
//   const isLogin = useSelector((state) => state.auth.isLogin);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // 현재 경로 확인용
//   const location = useLocation();
//   const product = useSelector((state) => state.product.product);

//   // product 최신화
//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(setProductAPI(id));
//       // 두번째 useEffect 활성화플래그
//       setIsFirstEffectComplete(true);
//     };

//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     // product가 로딩되기전이면 실행 X
//     if (!isFirstEffectComplete) return;

//     const handleViewLog = async () => {
//       const stored = localStorage.getItem("loginInfo");

//       if (!stored) return;

//       const { accessToken } = JSON.parse(stored);
//       const payload = parseJwt(accessToken);

//       api.post("/view/log", {
//         upk: payload.id,
//         ppk: Number(id),
//         categorySubId: product.categorySubId
//       });
//     }

//     handleViewLog();
//     window.scrollTo({ top: 0, behavior: "auto" });

//   }, [isFirstEffectComplete]);

//   // 구매 수량 감소 버튼 클릭 이벤트
//   const handleDecrease = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };

//   // 구매 수량 증가 버튼 클릭 이벤트
//   const handleIncrease = () => {
//     if (count < product.count) {
//       setCount(count + 1);
//     }
//   };

//   // 구매 수량 직접 입력시 이벤트
//   const handleChange = (e) => {
//     let value = e.target.value;

//     // 숫자만 설정(, 제거)
//     let num = parseInt(value.replace(/[^0-9]/g, "")) || 0;

//     // 1미만을 입력할 경우 1설정
//     if (num < 1) {
//       num = 1;
//     }
//     // 최대 갯수를 초과할 경우 최대치 설정
//     if (num > product.count) {
//       num = product.count;
//     }

//     setCount(num);
//   };

//   // 장바구니 클릭
//   const handleAddCart = async () => {
//     // 로그인 상태 확인
//     if (isLogin) {
//       // 로그인시 상품의 id와 qty 연계
//       const isNew = await dispatch(addCart(id, count));

//       // 신규 상품 등록시
//       if (isNew) {
//         // 장바구니 확인
//         Swal.fire({
//           icon: 'success',
//           title: '✅ 장바구니 등록',
//           text: product.productName + "가 장바구니에 등록이 완료되었습니다.",
//           confirmButtonText: '확인'
//         });
//       } else {
//         Swal.fire({
//           icon: 'success',
//           title: '✅ 장바구니 등록',
//           text: product.productName + "의 수량이 증가 되었습니다.",
//           confirmButtonText: '확인'
//         });
//       }
//     } else {
//       // 로그인 필요시
//       Swal.fire({
//         icon: 'warning',
//         title: '⚠ 로그인 화면으로',
//         text: "로그인이 필요합니다.",
//         confirmButtonText: '확인'
//       }) // 현재 페이지 경로(location.pathname)를 state에 담아 로그인 페이지로 이동
//         .then(() => { navigate("/login", { state: { from: location.pathname } }) });
//     }
//   };

//   // 탭 화면 표시용
//   const tabLabels = ["속성정보", "상세정보", "구매후기", "상품문의", "배송/반품/교환정보"];
//   // 탭 이벤트용 변수명
//   const tabEventNames = ["item", "detail", "review", "qna", "return"];

//   // 탭 클릭시 위치 설정
//   const sectionRefs = {
//     item: useRef(null),
//     detail: useRef(null),
//     review: useRef(null),
//     qna: useRef(null),
//     return: useRef(null)
//   };

//   // 탭 클릭 이벤트
//   const handleTabClick = (name) => {
//     const section = sectionRefs[name].current;
//     if (section) {
//       section.scrollIntoView({ block: "start" });
//     }
//   };

//   // 화면 표시용 할인가 적용 가격 : 9,999
//   const salesPrice = Math.floor(product.price * ((100 - product.dc) / 100));
  
//   return (
//     <div className="product-container">
//       <div className="product-detail">
//         <div className="product-detail-main">
//           <div className="product-image">
//             <div
//               className={`badge-container ${ product.hotDeal && product.memberSpecial ? "multi" : "" }`}>
//               { product.hotDeal && <span className="badge hot">원딜핫딜</span>}
//               { product.memberSpecial && <span className="badge member">멤버특가</span>}
//             </div>
//             <div className="product-image-container">
//               <img
//                 src={`/images/productImages/${product.imageUrl}`}
//                 alt={ product.imageUrl_name }
//                 className="product-image-main"
//               />
//               { product.count === 0 && <div class="sold-out">SOLD OUT</div> }
//             </div>
//           </div>

//           <div className="product-info">
//             <div className="product-info-top">
//               <div className="product-info-left">
//                 { product.productName} ㅣ {" "}
//                 <Link to={`/brand/${encodeURIComponent(product.brandName)}`} className="product-brand">
//                   { product.brandName}
//                 </Link>
//               </div>
//             </div>
//             <div className="product-title">
//               [{product.brandName}] {product.productName}
//             </div>
//             <div className="product-discount red">
//               { Math.floor(product.price * (product.dc / 100)).toLocaleString() + "원" } 할인
//               <span className="product-price-original line">
//                 {product.price?.toLocaleString() + "원"}
//               </span>
//             </div>
//             <div className="product-price-final">
//               {salesPrice.toLocaleString() + "원"}
//             </div>
//             <div className="product-period red">
//               행사 기간 2025-09-10 ~ 2025-10-20
//             </div>
//             <hr />
//             <ul className="product-meta">
//               <li>상품번호</li>
//               <li>{product.pid}</li>
//             </ul>
//             <ul className="product-meta">
//               <li>배송</li>
//               <li>
//                 {product.delName}<br />
//                 {product.delDescription && product.delDescription.split("\n").map((line, i) => (
//                   <React.Fragment key={i}>
//                     {line}
//                     <br />
//                   </React.Fragment>
//                 ))}
//               </li>
//             </ul>
//             <ul className="product-meta">
//               <li>판매자</li>
//               <li>{product.seller}</li>
//             </ul>
//             <ul className="product-meta">
//               <li>원산지</li>
//               <li>{product.origin}</li>
//             </ul>
//             <ul className="product-meta">
//               <li>판매단위</li>
//               <li>{product.unit}</li>
//             </ul>
//             <ul className="product-meta">
//               <li>중량/용량</li>
//               <li>{product.weight}</li>
//             </ul>
//             <ul className="product-meta">
//               <li>총 수량</li>
//               <li>{product.count?.toLocaleString()}개</li>
//             </ul>
//             <ul className="product-meta">
//               <li>알레르기정보</li>
//               <li>{product.allergyInfo}</li>
//             </ul>
//             <ul className="product-meta">
//               <li>안내사항</li>
//               <li>{product.description}</li>
//             </ul>
//             <hr />
//             <div className="product-purchase">
//               <ul className="product-purchase-info">
//                 <li>
//                   수량 <span>(최소구매수량 1개)</span>
//                 </li>
//                 <li>
//                   <div className="product-qty-control">
//                     <button className="qty-btn" onClick={handleDecrease}>
//                       -
//                     </button>
//                     <input
//                       className="qty-input"
//                       type="text"
//                       value={count.toLocaleString()}
//                       onChange={handleChange}
//                     />
//                     <button className="qty-btn" onClick={handleIncrease}>
//                       +
//                     </button>
//                   </div>
//                 </li>
//               </ul>
//               <ul className="product-purchase-info">
//                 <li>
//                   총금액 <span>(부가세포함)</span>
//                 </li>
//                 <li>{(salesPrice * count).toLocaleString() + "원"}</li>
//               </ul>
//             </div>
//             <div className="product-buttons">
//               <button className="btn-cart" onClick={handleAddCart} disabled={product.count === 0} >
//                 장바구니
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="product-tabs">
//         <ul className="product-tab-list">
//           {tabLabels.map((label, i) => (
//             <li key={i}>
//               <button onClick={() => handleTabClick(tabEventNames[i])}>
//                 {label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div style={{ marginBottom: "20px" }}></div>
//       {/* 각 탭 섹션 */}
//       <div className="product-tab-content">
//         <section className="product-section" ref={sectionRefs.item} id="item">
//           <Item images={product.productDescriptionImage} />
//         </section>

//         <section
//           className="product-section"
//           ref={sectionRefs.detail}
//           id="detail">
//           <Detail images={product.productInformationImage} />
//         </section>

//         <section
//           className="product-section"
//           ref={sectionRefs.review}
//           id="review">
//           <ReviewList id={id} />
//         </section>

//         <section 
//           className="product-section"
//           ref={sectionRefs.qna}
//           id="qna">
//           <QnA id={ id } product={ product } />
//         </section>

//         <section
//           className="product-section"
//           ref={sectionRefs.return}
//           id="return">
//           <Return />
//         </section>
//       </div>
//     </div>
//   );
// }




import "./ProductDetail.scss";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { Item } from "features/productDetail/item/Item";
import { Detail } from "features/productDetail/Detail/Detail";
import { ReviewList } from "features/productDetail/review/ReviewList";
import { QnA } from "features/productDetail/qna/QnA";
import { Return } from "features/productDetail/return/Return";

import { useProductDetail } from "features/productDetail/hooks/useProductDetail";

export function ProductDetail() {
  const { id } = useParams();

  const {
    product,
    count,
    salesPrice,
    handleDecrease,
    handleIncrease,
    handleChange,
    handleAddCart,
    handleTabClick,
    sectionRefs,
  } = useProductDetail();

  const tabLabels = ["속성정보", "상세정보", "구매후기", "상품문의", "배송/반품/교환정보"];
  const tabEventNames = ["item", "detail", "review", "qna", "return"];

  return (
    <div className="product-container">
      <div className="product-detail">
        <div className="product-detail-main">
          {/* ----------------------- 이미지 ----------------------- */}
          <div className="product-image">
            <div
              className={`badge-container ${
                product.hotDeal && product.memberSpecial ? "multi" : ""
              }`}
            >
              {product.hotDeal && <span className="badge hot">원딜핫딜</span>}
              {product.memberSpecial && (
                <span className="badge member">멤버특가</span>
              )}
            </div>

            <div className="product-image-container">
              <img
                src={`/images/productImages/${product.imageUrl}`}
                alt={product.imageUrl_name}
                className="product-image-main"
              />
              {product.count <= 0 && <div className="sold-out">SOLD OUT</div>}
            </div>
          </div>

          {/* ----------------------- 상품 정보 ----------------------- */}
          <div className="product-info">
            <div className="product-info-top">
              <div className="product-info-left">
                {product.productName} ㅣ{" "}
                <Link
                  to={`/brand/${encodeURIComponent(product.brandName)}`}
                  className="product-brand"
                >
                  {product.brandName}
                </Link>
              </div>
            </div>

            <div className="product-title">
              [{product.brandName}] {product.productName}
            </div>

            <div className="product-discount red">
              {(Math.floor(product.price * (product.dc / 100))).toLocaleString()}원 할인
              <span className="product-price-original line">
                {product.price?.toLocaleString()}원
              </span>
            </div>

            <div className="product-price-final">
              {salesPrice.toLocaleString()}원
            </div>

            <hr />

            {/* Meta 정보 */}
            <ul className="product-meta">
              <li>상품번호</li>
              <li>{product.pid}</li>
            </ul>

            <ul className="product-meta">
              <li>배송</li>
              <li>
                {product.delName}
                <br />
                {product.delDescription &&
                  product.delDescription.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </li>
            </ul>

            <ul className="product-meta">
              <li>판매자</li>
              <li>{product.seller}</li>
            </ul>

            <ul className="product-meta">
              <li>원산지</li>
              <li>{product.origin}</li>
            </ul>

            <ul className="product-meta">
              <li>판매단위</li>
              <li>{product.unit}</li>
            </ul>

            <ul className="product-meta">
              <li>중량/용량</li>
              <li>{product.weight}</li>
            </ul>

            <ul className="product-meta">
              <li>총 수량</li>
              <li>{product.count?.toLocaleString()}개</li>
            </ul>

            <hr />

            {/* 구매 옵션 */}
            <div className="product-purchase">
              <ul className="product-purchase-info">
                <li>수량</li>
                <li>
                  <div className="product-qty-control">
                    <button className="qty-btn" onClick={handleDecrease}>
                      -
                    </button>

                    <input
                      className="qty-input"
                      type="text"
                      value={count.toLocaleString()}
                      onChange={handleChange}
                    />

                    <button className="qty-btn" onClick={handleIncrease}>
                      +
                    </button>
                  </div>
                </li>
              </ul>

              <ul className="product-purchase-info">
                <li>총금액 (부가세포함)</li>
                <li>{(salesPrice * count).toLocaleString()}원</li>
              </ul>
            </div>

            <div className="product-buttons">
              <button
                className="btn-cart"
                onClick={handleAddCart}
                disabled={product.count <= 0}
              >
                장바구니
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------- 탭 ----------------------- */}
      <div className="product-tabs">
        <ul className="product-tab-list">
          {tabLabels.map((label, i) => (
            <li key={i}>
              <button onClick={() => handleTabClick(tabEventNames[i])}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ----------------------- 탭 콘텐츠 ----------------------- */}
      <div className="product-tab-content">
        <section ref={sectionRefs.item} id="item">
          <Item images={product.productDescriptionImage} />
        </section>

        <section ref={sectionRefs.detail} id="detail">
          <Detail images={product.productInformationImage} />
        </section>

        <section ref={sectionRefs.review} id="review">
          <ReviewList id={id} />
        </section>

        <section ref={sectionRefs.qna} id="qna">
          <QnA id={id} product={product} />
        </section>

        <section ref={sectionRefs.return} id="return">
          <Return />
        </section>
      </div>
    </div>
  );
}
