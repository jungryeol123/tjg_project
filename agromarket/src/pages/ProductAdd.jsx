import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setDeliveryAPI } from "features/delivery/deliveryAPI";
import { useSelector, useDispatch } from "react-redux";
import { ImageUploadList } from "./ImageUploadList";
import { setProductData } from "../features/product/productAPI.js";
import Swal from 'sweetalert2';
import "./ProductAdd.css";

export function ProductAdd() {
  // 배송정보리스트
  const deliveryList = useSelector((state) => state.delivery.deliveryList);
  const imageList = ["상품 이미지", "속성 이미지", "상세 이미지"];
  // 기존 이미지 URL 배열 (item.images: 서버에서 온 이미지 이름)
  const [existingImages, setExistingImages] = useState([null, null, null]);
  const navigate = useNavigate();

  // 상품 편집 시 데이터
  const location = useLocation();
  // 기존 상품 정보 취득
  const { item } = location.state || {};

  const dispatch = useDispatch();

  // form데이터용
  const [formData, setFormData] = useState({});

  // 이미지 등록용
  const [imageListFile, setImageListFile] = useState([]);

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

    if(item) {
      // 상품 편집시 formData 설정
      setFormData(
        {
          productName: item.productName,
          brandName: item.brandName,
          seller: item.seller,
          origin: item.origin,
          unit: item.unit,
          weight: item.weight,
          count: item.count,
          price: item.price,
          dc: item.dc,
          allergyInfo: item.allergyInfo,
          description: item.description,
          notes: item.notes,
          delType: item.delType,
        }
      );

    // 기존 이미지 설정
    const urls = imageList.map((_, idx) => idx === 0 ? `/images/productImages/${item.imageUrl}`
                                            : idx === 1 ? `/images/productInformation/${item.productInformationImage}`
                                            : idx === 2 ? `/images/productDescription/${item.productDescriptionImage}`
                                            : null);
      setExistingImages(urls);
    } else {
      // 상품 등록시 formData 설정
      setFormData(
        {
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
        }
      );
    }
  }, []); 

  // form데이터 입력시 이벤트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log("test",formData);
  
  // 이미지 등록 시 이벤트
  const handleImagesSelect = (index, file) => {
    // 이미지 등록 시 이벤트
    setImageListFile((prevList) => {
      const newList = [...prevList]; // 기존 배열 복사
      newList[index] = file; // 해당 위치에 새 파일 저장 (기존 파일 존재시 교체)
      return newList;
    });
  };

  // 등록 버튼 클릭시 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(formData)) return;

    // 신규 등록 : true, 상품 편집 : false
    const result = setProductData(formData, imageListFile, !item ? true : false, item?.id, imageList.length);

    // 등록 성공시
    if(result){
      Swal.fire({
          icon: 'success',
          title: '✅ 상품 등록 성공!',
          text: '상품이 성공적으로 등록되었습니다.',
          confirmButtonText: '확인',
        }).then(() => {
          navigate("/productList/update");
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '❌ 상품 등록 실패!',
        text: '다시 시도해주세요.',
      });
    }
  };

  
  // 필수 항목 체크
  const validateForm = () => {
    // 각 항목 체크
    for (const field of inputField) {
      const value = formData[field.name];

      // 값이 없거나 공백일 경우
      if (value === null || value === undefined || String(value).trim() === "") {
        Swal.fire({
            icon: 'warning',
            title: '필수 항목 미입력',
            text: `${field.label}을(를) 입력해주세요.`,
            confirmButtonText: '확인'
          });
        return false;
      }

      // 숫자 타입인 경우 추가 검사
      if (field.type === "number" && (isNaN(value) || Number(value) < 0)) {
          Swal.fire({
            icon: 'warning',
            title: '필수 항목 미입력',
            text: `${field.label}에는 0 이상의 숫자만 입력 가능합니다.`,
            confirmButtonText: '확인'
          });
        return false;
      }
    }

    // 안내사항 검사
    if (
      formData.notes === null ||
      formData.notes === undefined ||
      String(formData.notes).trim() === ""
    ) {
        Swal.fire({
          icon: 'warning',
          title: '필수 항목 미입력',
          text: "안내사항을 입력해주세요.",
          confirmButtonText: '확인'
        });
      return false;
    }

    // 배송정보 검사
    if (
      formData.delType === null ||
      formData.delType === undefined ||
      String(formData.delType).trim() === ""
    ) {
        Swal.fire({
          icon: 'warning',
          title: '필수 항목 미입력',
          text: "배송정보를 선택해주세요.",
          confirmButtonText: '확인'
        });
      return false;
    }

    // 이미지 정보 체크
    for (let i = 0; i < imageList.length; i++) {
      // 신규 이미지등록 또는 기존 이미지 등록이 둘다 되있지 않으면 이미지등록 필요
      if (!imageListFile[i] && !existingImages[i]) {
          Swal.fire({
            icon: 'warning',
            title: '필수 항목 미입력',
            text: `${imageList[i]}를 등록하세요.`,
            confirmButtonText: '확인'
          });
        return false; // 하나라도 누락되면 등록 불가
      }
    }

    return true;
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
            value={ formData.delType }
            onChange={ handleChange }
          >
            <option value="">배송 방법을 선택해주세요.</option>
            { deliveryList &&
              deliveryList.map((option, idx) => (
                <option key={ idx } value={ option.delType }>
                  { option.delName }
                </option>
              ))}
          </select>
        </div>
        <ImageUploadList onFileSelect={ handleImagesSelect }
                         imageList={ imageList } existingImages= { existingImages }/>
        <button type="submit" className="submit-btn">등록</button>
      </form>
    </div>
  );
}
