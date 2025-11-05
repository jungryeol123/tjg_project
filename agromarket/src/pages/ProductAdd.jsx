import React, { useState, useEffect } from "react";
import { setDeliveryAPI } from "features/delivery/deliveryAPI";
import { setProductData } from "features/product/productAPI";
import { useSelector, useDispatch } from "react-redux";
import { ImageUpload } from "./ImageUpload";
import "./ProductAdd.css";

export function ProductAdd() { 
  // 배송정보리스트
  const deliveryList = useSelector((state) => state.delivery.deliveryList);
  const dispatch = useDispatch();

  // form데이터용
  const [formData, setFormData] = useState({
    productName: "",
    brandName: "",
    seller: "",
    origin: "",
    unit: "",
    weight: "",
    count: "",
    price: "",
    dc: "",
    allergyInfo: "",
    description: "",
    notes: "",
    delType: ""
  });

  // form필드
  const inputField = [
    { label: "상품명", name: "productName", placeholder: "상품명을 입력해주세요.", type: "text" },
    { label: "브랜드명", name: "brandName", placeholder: "브랜드명을 입력해주세요.", type: "text" },
    { label: "판매자", name: "seller", placeholder: "판매자명을 입력해주세요.", type: "text" },
    { label: "원산지", name: "origin", placeholder: "국산, 일본, 미국 등", type: "text" },
    { label: "판매단위", name: "unit", placeholder: "예: 1팩, 500g 등", type: "text" },
    { label: "중량/용량", name: "weight", placeholder: "예: 500g, 1kg 등", type: "text" },
    { label: "총 수량", name: "count", placeholder: "총 수량을 입력해주세요.", type: "number" },
    { label: "가격", name: "price", placeholder: "가격을 입력해주세요.", type: "number" },
    { label: "할인 정보", name: "dc", placeholder: "할인을 입력해주세요.", type: "number" },
    { label: "알레르기 정보", name: "allergyInfo", placeholder: "예: 우유, 견과류 등", type: "text" },
    { label: "상품 설명", name: "description", placeholder: "예: 맛있는 1등급 우유", type: "text" },
  ];

  useEffect(() => {
    dispatch(setDeliveryAPI());
  }, [dispatch]);

  // form데이터 입력시 이벤트
  const handleChange = (e) => {
    const { name, value  } = e.target;
    setFormData({ ...formData, [name]: value  });
  };

  // 이미지 등록용
  const [imageFile, setImageFile] = useState(null);

  // 이미지 등록 시 이벤트
  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  // 등록 버튼 클릭시 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();

    // 이미지 미등록시
    if (!imageFile) {
      alert("이미지를 선택해주세요!");
      return;
    }

    setProductData(formData, imageFile);
  };

  return (
    <div className="product-add-container">
      <h1>상품 등록</h1>
      <form onSubmit={ handleSubmit } className="product-add-form">
        <div className="form-grid">
          { inputField.map((field) => (
            <div className="form-group" key={ field.name }>
              <label>{ field.label }:</label>
              <input
                type={ field.type }
                name={ field.name }
                placeholder={ field.placeholder }
                value={ formData[field.name] }
                onChange={ handleChange }
              />
            </div>
          ))}
        </div>

        <div className="form-group full-width">
          <label>안내사항:</label>
          <textarea
            name="notes"
            placeholder="배송 안내, 보관 방법 등"
            value={ formData.notes }
            onChange={ handleChange }
          />
        </div>

        <div className="form-group full-width">
          <label>배송정보:</label>
          <select
            name="delType"
            value={ formData.deliveryInfo }
            onChange={ handleChange }
          >
            <option value="">배송 방법을 선택해주세요.</option>
            { deliveryList &&
              deliveryList.map((option, idx) => (
                <option key={ idx  } value={ option.delType }>
                  { option.delName }
                </option>
              ))}
          </select>
        </div>

        { /* 이미지 등록 */ }
        <div className="full-width">
          <ImageUpload onFileSelect={ handleImageSelect } />
        </div>

        <button type="submit" className="submit-btn">등록</button>
      </form>
    </div>
  );
}