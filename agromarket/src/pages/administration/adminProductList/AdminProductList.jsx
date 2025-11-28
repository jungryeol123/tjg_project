import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo, useEffect, useState } from "react";
// shared
// features
import { parseJwt } from "features/auth/parseJwt";
import { setProductListAPI, delProductData } from "features/product/productAPI";
import "./AdminProductList.scss";
import "../../../styles/components/filter.scss";
import ProductCard from 'shared/ui/productCard/ProductCard';
import { FilterItem } from 'shared/constants/FilterItem';

export function AdminProductList() {
  const productList = useSelector((state) => state.product.productList);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  // 상품 리스트 최신화
  useEffect(() => {
    dispatch(setProductListAPI());
    setActiveFilter("");
  }, []);

  // 등록 유저의 상품 표시
  const updateProducts = useMemo(() => {
    if(localStorage.getItem("loginInfo")){
      // 토큰에서 user의 id취득
      const { accessToken } = JSON.parse(localStorage.getItem("loginInfo"));
      const payload = parseJwt(accessToken);
      // user의 id설정
      const upk = payload.id;

      if (!productList || productList.length === 0) return [];
      setLoading(false);
      return productList.filter((p) => p.user.id == upk);
    }
  }, [productList]);
    
  useEffect(() => {
    setFilteredProducts(updateProducts);
  }, [productList, updateProducts]);

  // 선택된 필터라벨
  const [activeFilter, setActiveFilter] = useState("");

  // 필터 분류
  const filterLabel = [
    { label: "최신순", value: "new" },
    { label: "높은가격순", value: "priceHigh" },
    { label: "낮은가격순", value: "priceLow" }
  ];

  // 필터 클릭시 이벤트
  const handleFilter = (type) => {
    let filtered = [];
    // 클릭한 필터 활성화
    setActiveFilter(type);

    // 최신순 클릭
    if(type === "new") {
      filtered = filteredProducts.toSorted(
        (a, b) => new Date(b.productDate) - new Date(a.productDate)
      );
    }
    // 가격순 클릭
    else if(type === "priceHigh") {
      filtered = filteredProducts.toSorted(
        (a, b) => b.price - a.price
      );
    }
    // 구매순 클릭
    else if(type === "priceLow") {
      filtered = filteredProducts.toSorted(
        (a, b) => a.price - b.price
      );
    }
    // 필터 결과 설정
    setFilteredProducts(filtered);
  }

  // 삭제 버튼 클릭
  const handleDelete = (productId) => {
    Swal.fire({
      icon: 'warning',
      text: '상품을 정말 삭제 하시겠습니까?',
      showCancelButton: true, 
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      // 삭제 버튼 클릭시
      if (result.isConfirmed) {
        // 삭제 성공시
        if(dispatch(delProductData(productId))){
          Swal.fire({
            icon: 'success',
            title: '✅ 상품 삭제 성공!',
            text: '상품이 성공적으로 삭제되었습니다.',
            confirmButtonText: '확인',
          }).then(() => {
            dispatch(setProductListAPI());
          });
        } else{
          Swal.fire({
            icon: 'success',
            title: '❌ 상품 삭제 실패!',
            text: '다시 시도해주세요.'
          });
        }
      }
    });
  }

  return (
    <div className="new-products-page">
      <h1 className="page-title">"상품 편집"</h1>
      {/* 필터 */}
      <ul className="product-filter">
        {filterLabel.map((item) => (
          <FilterItem
            key={item.value}
            label={item.label}
            value={item.value}
            activeFilter={activeFilter}
            onClick={handleFilter}
          />
        ))}
      </ul>
      <div className="product-list-container">
        {loading ? (
          <p className="loading">로딩 중...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((item, idx) => (
              // 상품 편집일 경우, 경로 변경
                <div>
                  <Link
                    to={`/admin/products/update`}
                    state={{ item }}
                    key={idx}
                  >
                    <ProductCard item={item} />
                    <button type="button" className="update-btn">편집</button>
                  </Link>
                  <button type="button" className="delete-btn" onClick={ () => { handleDelete(item.id) } }>삭제</button>
                </div>
            ))}
          </div>
        ) : (
          <p className="empty">상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
