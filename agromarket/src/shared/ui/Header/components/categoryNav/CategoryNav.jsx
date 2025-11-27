import React from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./CategoryNav.scss";

export default function CategoryNav() {
  // 카테고리(대분류) 리스트
  const categoryList = useSelector((state) => state.category.categoryList);
  const navigate = useNavigate();

  return (
    <nav className="category-nav">
      <ul className="category-nav__list">
        <li className="category-first">
          <FiMenu /><span>카테고리</span>
          <ul className="main-category-list">
            {categoryList.map((main) => (
              <li
                key={main.id}
                className="main-category-item"
                onClick={() =>
                  navigate(`/category/${encodeURIComponent(main.name)}`, {
                    state: { type: "main", id: main.id },
                  })}>
                {main.name}
                {main.subCategories && main.subCategories.length > 0 && (
                  <ul className="sub-category-list">
                    {main.subCategories.map((sub) => (
                      <li
                        key={sub.id}
                        onClick={(e) => {
                          e.stopPropagation(); // 부모 li 클릭 방지
                          navigate(`/category/${encodeURIComponent(sub.name)}`, {
                            state: { type: "sub", id: sub.id },
                          });
                        }}>
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
        <li>
          <ul>
            <li><Link to="/productList/new">신상품</Link></li>
            <li><Link to="/productList/best">베스트</Link></li>
            <li><Link to="/productList/sale">알뜰쇼핑</Link></li>
            <li><Link to="/productList/deal">특가/혜택</Link></li>
            <li><Link to="/recipe">레시피</Link></li>
          </ul>
        </li>
        <li className="category-last"><Link to="/delivery">샛별/하루 배송안내</Link></li>
      </ul>
    </nav>
  );
}