// useProductAdd.js
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setProductData } from "features/product/productAPI.js";

export function useProductAdd() {
  const navigate = useNavigate();

  // form 초기 설정
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
    categorySub: "",
  };

  // 미리보기 이미지 3개
  const initialExistingImages = [null, null, null];

  // 등록 버튼 클릭 시
  const handleSubmit = async (formData, imageListFile) => {
    const result = await setProductData(
      formData,
      imageListFile,
      true,
      "",
      initialExistingImages.length
    );

    if (result) {
      Swal.fire({
        icon: "success",
        title: "✅ 상품 등록 성공!",
        text: "상품이 성공적으로 등록되었습니다.",
      }).then(() => {
        navigate("/admin/adminProductList");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "❌ 상품 등록 실패!",
        text: "다시 시도해주세요.",
      });
    }
  };

  return {
    initialFormData,
    initialExistingImages,
    handleSubmit,
  };
}
