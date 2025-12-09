import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

export function useSearchResult() {
  const { keyword } = useParams();
  const location = useLocation();

  const productList = useSelector((state) => state.product.productList);
  const categoryList = useSelector((state) => state.category.categoryList);

  const [filterList, setFilterList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");

  const pathName = location.pathname;
  const categoryData = location.state || {};

  // 🔍 검색/브랜드/카테고리 선택에 따른 필터링
  useEffect(() => {
    let filtered = [];

    // 1) 검색 경로
    if (pathName.includes("/search")) {
      filtered = productList.filter((p) =>
        p.description.toLowerCase().includes(keyword.toLowerCase()) ||
        p.productName.toLowerCase().includes(keyword.toLowerCase()) ||
        p.brandName.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    // 2) 브랜드 경로
    else if (pathName.includes("/brand")) {
      filtered = productList.filter((p) => p.brandName === keyword);
    }
    // 3) 카테고리 경로
    else {
      // 대분류
      if (categoryData.type === "main") {
        const category = categoryList.find(
          (c) => c.id === categoryData.id
        );

        filtered = productList.filter((p) =>
          category.subCategories.some((sub) => sub.id === p.categorySub.id)
        );
      }
      // 중분류
      else {
        filtered = productList.filter(
          (p) => p.categorySub.id === categoryData.id
        );
      }
    }

    setFilterList(filtered);
    setActiveFilter("");
  }, [keyword]);

  // 🔍 필터 UI 클릭 처리
  const handleFilter = (type) => {
    let filtered = [];

    setActiveFilter(type);

    if (type === "new") {
      filtered = [...filterList].sort(
        (a, b) => new Date(b.productDate) - new Date(a.productDate)
      );
    } else if (type === "priceHigh") {
      filtered = [...filterList].sort((a, b) => b.price - a.price);
    } else if (type === "priceLow") {
      filtered = [...filterList].sort((a, b) => a.price - b.price);
    }

    setFilterList(filtered);
  };

  return {
    keyword,
    filterList,
    activeFilter,
    handleFilter
  };
}
