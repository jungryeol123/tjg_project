// useProductUpdate.js
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { setProductData } from "features/product/productAPI";

export function useProductUpdate() {
  const navigate = useNavigate();
  const { item } = useLocation().state;

  // 💡 기존 데이터를 기반으로 초기 formData 생성
  const initialFormData = {
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
    categorySub: item.categorySub,
  };

  // 💡 기존 이미지 경로
  const existingImages = [
    `/images/productImages/${item.imageUrl}`,
    `/images/productInformation/${item.productInformationImage}`,
    `/images/productDescription/${item.productDescriptionImage}`,
  ];

  // ⭐ 제출 로직
  const handleSubmit = async (formData, imageListFile) => {
    const result = await setProductData(
      formData,
      imageListFile,
      false,             // update mode
      item.id,
      existingImages.length
    );

    if (result) {
      Swal.fire({
        icon: "success",
        title: "✅ 상품 수정 성공!",
        text: "상품이 성공적으로 수정되었습니다.",
      }).then(() => navigate("/admin/adminProductList"));
    } else {
      Swal.fire({
        icon: "error",
        title: "❌ 수정 실패",
        text: "다시 시도해주세요.",
      });
    }
  };

  return {
    item,
    initialFormData,
    existingImages,
    handleSubmit,
  };
}
