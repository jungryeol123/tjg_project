// features/productList/hooks/useHeaderProductList.js

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortByNew,
  sortByOld,
  sortHotOrSpecial,
  sortBySale,
  sortByPriceHigh,
  sortByPriceLow,
} from "../utils/productSortUtils";

import { headerProductAPI } from "../api/headerProductAPI";
import { setProductListAPI } from "features/product/productAPI";

export function useHeaderProductList(id) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // ▶ 상품 리스트 불러오기
  useEffect(() => {
    dispatch(setProductListAPI());
    setActiveFilter("");
  }, []);

  // ▶ 분류별 상품 정렬
  const newProducts = useMemo(
    () => (id === "new" ? sortByNew(productList) : []),
    [id, productList]
  );

  const dealProducts = useMemo(
    () => (id === "deal" ? sortHotOrSpecial(productList) : []),
    [id, productList]
  );

  const saleProducts = useMemo(
    () => (id === "sale" ? sortBySale(productList) : []),
    [id, productList]
  );

  const timeProducts = useMemo(
    () => (id === "time" ? sortByOld(productList) : []),
    [id, productList]
  );

  // ▶ 베스트 상품 API 호출
  useEffect(() => {
    if (id !== "best") return;

    const loadBest = async () => {
      setLoading(true);
      try {
        const result = await headerProductAPI.getBestProducts();
        setFilteredProducts(result);
      } catch (err) {
        console.error("베스트 상품 불러오기 실패:", err);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBest();
  }, [id]);

  // ▶ id에 해당하는 기본 필터 반영
  useEffect(() => {
    if (id === "new") setFilteredProducts(newProducts);
    else if (id === "deal") setFilteredProducts(dealProducts);
    else if (id === "sale") setFilteredProducts(saleProducts);
    else if (id === "time") setFilteredProducts(timeProducts);
  }, [id, newProducts, dealProducts, saleProducts, timeProducts]);

  // ▶ 필터 버튼 정렬 기능
  const handleFilter = (type) => {
    setActiveFilter(type);

    let sorted = [...filteredProducts];

    if (type === "new") sorted = sortByNew(filteredProducts);
    else if (type === "priceHigh") sorted = sortByPriceHigh(filteredProducts);
    else if (type === "priceLow") sorted = sortByPriceLow(filteredProducts);

    setFilteredProducts(sorted);
  };

  return {
    filteredProducts,
    loading,
    activeFilter,
    handleFilter,
  };
}
