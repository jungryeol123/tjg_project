// import Swal from 'sweetalert2';
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// // features
// import { setProductData } from 'features/product/productAPI';
// import { ProductForm } from 'features/administration/productSkill/productAdd/components/ProductForm';

// export function ProductUpdate() {
//   const navigate = useNavigate();
//   // 기존 데이터 취득
//   const { item } = useLocation().state;

//   // form초기 설정
//   const initialFormData = {
//     productName: item.productName,
//     brandName: item.brandName,
//     seller: item.seller,
//     origin: item.origin,
//     unit: item.unit,
//     weight: item.weight,
//     count: item.count,
//     price: item.price,
//     dc: item.dc,
//     allergyInfo: item.allergyInfo,
//     description: item.description,
//     notes: item.notes,
//     delType: item.delType,
//     categorySub: item.categorySub
//   };

//   // 미리보기용 이미지 설정
//   const existingImages = [
//     `/images/productImages/${item.imageUrl}`,
//     `/images/productInformation/${item.productInformationImage}`,
//     `/images/productDescription/${item.productDescriptionImage}`
//   ];

//   // 등록버튼 클릭시 이벤트
//   const handleSubmit = async (formData, imageListFile) => {
//     const result = await setProductData(formData, imageListFile, false, item.id, existingImages.length);

//     // 등록 성공시
//     if(result){
//       Swal.fire({
//           icon: 'success',
//           title: '✅ 상품 등록 성공!',
//           text: '상품이 성공적으로 등록되었습니다.',
//           confirmButtonText: '확인',
//         }).then(() => {
//           navigate("/admin/adminProductList");
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: '❌ 상품 등록 실패!',
//         text: '다시 시도해주세요.',
//       });
//     }
//   };

//   return (
//     <ProductForm
//       mode="update"
//       initialFormData={initialFormData}
//       existingImages={existingImages}
//       onSubmit={handleSubmit}
//       initialCount = {item.count}
//       initialPrice = {item.price}
//     />
//   );
// }



// ProductUpdate.jsx
import { ProductForm } from "features/administration/productSkill/productAdd/components/ProductForm";
import { useProductUpdate } from "features/administration/productSkill/productUpdate/useProductUpdate";
import React from "react";

export function ProductUpdate() {
  const { item, initialFormData, existingImages, handleSubmit } = useProductUpdate();

  return (
    <ProductForm
      mode="update"
      initialFormData={initialFormData}
      existingImages={existingImages}
      onSubmit={handleSubmit}
      initialCount={item.count}
      initialPrice={item.price}
    />
  );
}
