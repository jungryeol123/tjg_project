import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// features
import { setDeliveryAPI } from "features/delivery/deliveryAPI";
import { setProductData } from "features/product/productAPI.js";
import "./ProductAdd.css";
import { ProductValidateCheck } from 'features/administration/productSkill/ProductValidateCheck';
import { ImageUploadList } from 'features/administration/productSkill/ImageUploadList';

export function ProductAdd() {
  // 배송정보리스트
  const deliveryList = useSelector((state) => state.delivery.deliveryList);
  // 카테고리(대분류) 리스트
  const categoryList = useSelector((state) => state.category.categoryList);
  // 카테고리(중분류) 등록용
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedMain, setSelectedMain] = useState("");   // 선택한 대분류
  const [selectedSub, setSelectedSub] = useState("");     // 선택한 중분류
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const imageList = ["상품 이미지","속성 이미지","상세 이미지"];

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
    delType: "",
    categorySub : ""
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
    const { name, value } = e.target;
    if(name === "categorySub"){
        setFormData({ ...formData, [name] : { "id": parseInt(value)} });
        setSelectedSub(value)
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  // 카테고리 대분류 선택 이벤트(중분류 설정)
  const handleChangeCategory = (e) => {
    const { value } = e.target;

    const mainList = categoryList.find( (category) => category.id === parseInt(value) );
    // 대분류에 따른 카테고리 중분류 리스트 설정
    setSubCategoryList(mainList.subCategories);
    // 카테고리 대분류 표시용 설정
    setSelectedMain(value);
    // 카테고리 중분류 초기화
    setSelectedSub("");
  }
  
  // 이미지 등록용
  const [imageListFile, setImageListFile] = useState([]);

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
  const handleSubmit = async(e) => {
    e.preventDefault();

    // 필수 입력 체크시 미입력 항목이 존재하는 경우
    const vCheckResult = ProductValidateCheck(inputField, formData);

    // 미입력 항목 존재시 팝업 메세지 출력
    if(!vCheckResult.result){
      Swal.fire(vCheckResult.message);
      return ;
    }

    // 이미지 정보 체크
    // 이미지등록 필요
    if (!imageListFile[0]) {
        Swal.fire({
          icon: 'warning',
          title: '필수 항목 미입력',
          text: `${imageList[0]}를 등록하세요.`,
          confirmButtonText: '확인'
        });
      return ;
    }

    // 신규 등록 : true, 상품 편집 : false
    const result = await setProductData(formData, imageListFile, true, "", imageList.length);

    // 등록 성공시
    if(result){
      Swal.fire({
          icon: 'success',
          title: '✅ 상품 등록 성공!',
          text: '상품이 성공적으로 등록되었습니다.',
          confirmButtonText: '확인',
        }).then(() => {
          navigate("/admin/adminProductList");
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '❌ 상품 등록 실패!',
        text: '다시 시도해주세요.',
      });
    }
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
        <div className="form-group full-width">
          <label>상품 분류(대분류):</label>
          <select
            name="cateMain"
            value = { selectedMain }
            onChange={ handleChangeCategory }
          >
            <option value="" disabled>상품 카테고리를 선택해주세요.</option>
            { categoryList &&
              categoryList.map((option, idx) => (
                <option key={ idx } value={ option.id }>
                  { option.name }
                </option>
              ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label>상품 분류(중분류):</label>
          <select
            name="categorySub"
            value = { selectedSub }
            onChange={ handleChange }
          >
            <option value="" disabled>상품 카테고리를 선택해주세요.</option>
            { subCategoryList &&
              subCategoryList.map((option, idx) => (
                <option key={ idx } value={ option.id }>
                  { option.name }
                </option>
              ))}
          </select>
        </div>
        <ImageUploadList onFileSelect={ handleImagesSelect }
                         imageList={ imageList } />
        <button type="submit" className="submit-btn">등록</button>
      </form>
    </div>
  );
}