// import Swal from 'sweetalert2';
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // features
// import { setDeliveryAPI } from "features/delivery/deliveryAPI";
// import { ImageUploadList } from 'features/administration/productSkill/ImageUploadList';
// import { ProductValidateCheck } from 'features/administration/productSkill/ProductValidateCheck';
// import "./ProductAdd.css";

// export function ProductForm({ mode, initialFormData, existingImages, onSubmit, initialCount, initialPrice}) {
//   const dispatch = useDispatch();

//   // 배송정보리스트
//   const deliveryList = useSelector((state) => state.delivery.deliveryList);
//   // 카테고리(대분류) 리스트
//   const categoryList = useSelector((state) => state.category.categoryList);
//   // form데이터용
//   const [formData, setFormData] = useState(initialFormData);
//   const [count, setCount] = useState(initialCount); // 화면 표시용 수량
//   const [price, setPrice] = useState(initialPrice); // 화면 표시용 가격
//   const [imageListFile, setImageListFile] = useState([]);
//   const imageNames = ["상품 이미지","속성 이미지","상세 이미지"];
  
//   // 카테고리(중분류) 등록용
//   const [subCategoryList, setSubCategoryList] = useState([]);
//   const [selectedMain, setSelectedMain] = useState("");   // 선택한 대분류
//   const [selectedSub, setSelectedSub] = useState("");     // 선택한 중분류
  
//   const inputField = [
//       { label: "상품명", name: "productName", placeholder: "상품명을 입력해주세요.", type: "text" },
//       { label: "브랜드명", name: "brandName", placeholder: "브랜드명을 입력해주세요.", type: "text" },
//       { label: "판매자", name: "seller", placeholder: "판매자명을 입력해주세요.", type: "text" },
//       { label: "원산지", name: "origin", placeholder: "국산, 일본, 미국 등", type: "text" },
//       { label: "판매단위", name: "unit", placeholder: "예: 1팩, 500g 등", type: "text" },
//       { label: "중량/용량", name: "weight", placeholder: "예: 500g, 1kg 등", type: "text" },
//       { label: "총 수량", name: "count", placeholder: "총 수량을 입력해주세요.", type: "text" },
//       { label: "가격", name: "price", placeholder: "가격을 입력해주세요.", type: "text" },
//       { label: "할인 정보", name: "dc", placeholder: "할인을 입력해주세요.", type: "number" },
//       { label: "알레르기 정보", name: "allergyInfo", placeholder: "예: 우유, 견과류 등", type: "text" },
//       { label: "상품 설명", name: "description", placeholder: "예: 맛있는 1등급 우유", type: "text" },
//   ];

//   useEffect(() => {
//   dispatch(setDeliveryAPI());
//   }, []);

//   // form데이터 입력시 이벤트
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if(name === "categorySub"){
//       setFormData({ ...formData, [name] : { "id": parseInt(value)} });
//       setSelectedSub(value);
//     } else if(name === "count"){
//       // 숫자만 설정(, 제거)
//       const num = parseInt(value.replace(/[^0-9]/g, "")) || 0;
//       setCount(num);
//       setFormData({ ...formData, [name]: num });
//     } else if(name === "price"){
//       // 숫자만 설정(, 제거)
//       const num = parseInt(value.replace(/[^0-9]/g, "")) || 0;
//       setPrice(num);
//       setFormData({ ...formData, [name]: num });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // 카테고리 대분류 선택 이벤트(중분류 설정)
//   const handleChangeCategory = (e) => {
//     const { value } = e.target;

//     const mainList = categoryList.find( (category) => category.id === parseInt(value) );
//     // 대분류에 따른 카테고리 중분류 리스트 설정
//     setSubCategoryList(mainList.subCategories);
//     // 카테고리 대분류 표시용 설정
//     setSelectedMain(value);
//     // 카테고리 중분류 초기화
//     setSelectedSub("");
//   }

//   // 이미지 등록 시 이벤트
//   const handleImagesSelect = (index, file) => {
//     // 이미지 등록 시 이벤트
//     setImageListFile((prevList) => {
//       const newList = [...prevList]; // 기존 배열 복사
//       newList[index] = file; // 해당 위치에 새 파일 저장 (기존 파일 존재시 교체)
//       return newList;
//     });
//   };
  
//   // 등록 버튼 클릭시 이벤트
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 필수 입력 체크시 미입력 항목이 존재하는 경우
//     const v = ProductValidateCheck(inputField, formData);
//     // 미입력 항목 존재시 팝업 메세지 출력
//     if (!v.result) return Swal.fire(v.message);

//     // 이미지 필수 체크
//     // 신규 등록일 경우
//     if(mode === "add") {
//       if (!imageListFile[0]) {
//         return Swal.fire({ icon: "warning", text: "상품 이미지를 등록하세요" });
//       }
//     } else {
//       if (!imageListFile[0] && !existingImages[0]) {
//         return Swal.fire({ icon: "warning", text: "상품 이미지를 등록하세요" });
//       }
//     }

//     // 등록 버튼 클릭시 이벤트
//     onSubmit(formData, imageListFile);
//   };

//   return (
//     <div className="product-add-container">
//       <h1>상품 등록</h1>
//       <form onSubmit={ handleSubmit } className="product-add-form">
//         <div className="form-grid">
//           { inputField.map((field) => (
//             <div className="form-group" key={ field.name }>
//               <label>{ field.label }:</label>
//               <input
//                 type={ field.type }
//                 name={ field.name }
//                 placeholder={ field.placeholder }
//                 value={
//                     field.name === "count" ? count?.toLocaleString()
//                     : field.name === "price" ? price?.toLocaleString()
//                     : formData[field.name]
//                   }
//                 onChange={ handleChange }
//               />
//             </div>
//           ))}
//         </div>

//         <div className="form-group full-width">
//           <label>안내사항:</label>
//           <textarea
//             name="notes"
//             placeholder="배송 안내, 보관 방법 등"
//             value={ formData.notes }
//             onChange={ handleChange }
//           />
//         </div>

//         <div className="form-group full-width">
//           <label>배송정보:</label>
//           <select
//             name="delType"
//             value={ formData.delType }
//             onChange={ handleChange }
//           >
//             <option value="" disabled>배송 방법을 선택해주세요.</option>
//             { deliveryList &&
//               deliveryList.map((option, idx) => (
//                 <option key={ idx } value={ option.delType }>
//                   { option.delName }
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="form-group full-width">
//           <label>상품 분류(대분류):</label>
//           <select
//             name="cateMain"
//             value = { selectedMain }
//             onChange={ handleChangeCategory }
//           >
//             <option value="" disabled>상품 카테고리를 선택해주세요.</option>
//             { categoryList &&
//               categoryList.map((option, idx) => (
//                 <option key={ idx } value={ option.id }>
//                   { option.name }
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="form-group full-width">
//           <label>상품 분류(중분류):</label>
//           <select
//             name="categorySub"
//             value = { selectedSub }
//             onChange={ handleChange }
//           >
//             <option value="" disabled>상품 카테고리를 선택해주세요.</option>
//             { subCategoryList &&
//               subCategoryList.map((option, idx) => (
//                 <option key={ idx } value={ option.id }>
//                   { option.name }
//                 </option>
//               ))}
//           </select>
//         </div>

//         <ImageUploadList onFileSelect={ handleImagesSelect }
//                          imageNames={ imageNames } existingImages= { existingImages }/>
//         <button type="submit" className="submit-btn">등록</button>
//       </form>
//     </div>
//   );
// }


import React from "react";
import { ImageUploadList } from "features/administration/productSkill/ImageUploadList";
import "./ProductAdd.css";
import { useProductForm } from "features/administration/productSkill/productAdd/useProductForm";

export function ProductForm({
  mode,
  initialFormData,
  existingImages,
  onSubmit,
  initialCount,
  initialPrice,
}) {
  const inputField = [
    { label: "상품명", name: "productName", placeholder: "상품명을 입력해주세요.", type: "text" },
    { label: "브랜드명", name: "brandName", placeholder: "브랜드명을 입력해주세요.", type: "text" },
    { label: "판매자", name: "seller", placeholder: "판매자명을 입력해주세요.", type: "text" },
    { label: "원산지", name: "origin", placeholder: "국산, 일본, 미국 등", type: "text" },
    { label: "판매단위", name: "unit", placeholder: "예: 1팩, 500g 등", type: "text" },
    { label: "중량/용량", name: "weight", placeholder: "예: 500g, 1kg 등", type: "text" },
    { label: "총 수량", name: "count", placeholder: "총 수량을 입력해주세요.", type: "text" },
    { label: "가격", name: "price", placeholder: "가격을 입력해주세요.", type: "text" },
    { label: "할인 정보", name: "dc", placeholder: "할인을 입력해주세요.", type: "number" },
    { label: "알레르기 정보", name: "allergyInfo", placeholder: "예: 우유, 견과류 등", type: "text" },
    { label: "상품 설명", name: "description", placeholder: "예: 맛있는 1등급 우유", type: "text" },
  ];

  const {
    handleChange,
    handleSubmit,
    handleChangeCategory,
    handleImagesSelect,
    deliveryList,
    categoryList,
    subCategoryList,
    formData,
    count,
    price,
    selectedMain,
    selectedSub,
  } = useProductForm({
    mode,
    initialFormData,
    existingImages,
    initialCount,
    initialPrice,
    inputField,
    onSubmit,
  });

  const imageNames = ["상품 이미지", "속성 이미지", "상세 이미지"];

  return (
    <div className="product-add-container">
      <h1>상품 등록</h1>

      <form onSubmit={handleSubmit} className="product-add-form">
        <div className="form-grid">
          {inputField.map((field) => (
            <div className="form-group" key={field.name}>
              <label>{field.label}:</label>

              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={
                  field.name === "count"
                    ? count?.toLocaleString()
                    : field.name === "price"
                    ? price?.toLocaleString()
                    : formData[field.name]
                }
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="form-group full-width">
          <label>안내사항:</label>
          <textarea
            name="notes"
            placeholder="배송 안내, 보관 방법 등"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>배송정보:</label>
          <select name="delType" value={formData.delType} onChange={handleChange}>
            <option value="" disabled>
              배송 방법을 선택해주세요.
            </option>
            {deliveryList?.map((option, idx) => (
              <option key={idx} value={option.delType}>
                {option.delName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label>상품 분류(대분류):</label>
          <select name="cateMain" value={selectedMain} onChange={handleChangeCategory}>
            <option value="" disabled>
              상품 카테고리를 선택해주세요.
            </option>
            {categoryList?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label>상품 분류(중분류):</label>
          <select name="categorySub" value={selectedSub} onChange={handleChange}>
            <option value="" disabled>
              상품 카테고리를 선택해주세요.
            </option>
            {subCategoryList?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <ImageUploadList
          onFileSelect={handleImagesSelect}
          imageNames={imageNames}
          existingImages={existingImages}
        />

        <button type="submit" className="submit-btn">
          등록
        </button>
      </form>
    </div>
  );
}
