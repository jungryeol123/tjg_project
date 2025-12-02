import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import React from "react";
// features
import { setProductData } from "features/product/productAPI.js";
import { ProductForm } from './ProductForm';

export function ProductAdd() {
  const navigate = useNavigate();

  // form초기 설정
  const initialFormData = {
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
    categorySub: ""
  };

  // 미리보기용 이미지 설정
  const existingImages = [null, null, null];

  // 등록버튼 클릭시 이벤트
  const handleSubmit = async (formData, imageListFile) => {
    const result = await setProductData(formData, imageListFile, true, "", existingImages.length);

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
    <ProductForm
      mode="add"
      initialFormData={initialFormData}
      initialExistingImages={existingImages}
      onSubmit={handleSubmit}
      initialCount = {0}
      initialPrice = {0}
    />
  );
}