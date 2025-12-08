// useProductForm.js
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setDeliveryAPI } from "features/delivery/deliveryAPI";
import { ProductValidateCheck } from "features/administration/productSkill/ProductValidateCheck";

export function useProductForm({
  initialFormData,
  initialCount,
  initialPrice,
  existingImages,
  inputField,
  mode,
  onSubmit,
}) {
  const dispatch = useDispatch();
  const deliveryList = useSelector((state) => state.delivery.deliveryList);
  const categoryList = useSelector((state) => state.category.categoryList);

  const [formData, setFormData] = useState(initialFormData);
  const [count, setCount] = useState(initialCount);
  const [price, setPrice] = useState(initialPrice);
  const [imageListFile, setImageListFile] = useState([]);

  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  useEffect(() => {
    dispatch(setDeliveryAPI());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 중분류 선택
    if (name === "categorySub") {
      setFormData({ ...formData, [name]: { id: parseInt(value) } });
      setSelectedSub(value);
      return;
    }

    // 숫자 처리(count/price)
    if (name === "count" || name === "price") {
      const num = parseInt(value.replace(/[^0-9]/g, "")) || 0;
      if (name === "count") setCount(num);
      if (name === "price") setPrice(num);
      setFormData({ ...formData, [name]: num });
      return;
    }

    // 일반 input
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeCategory = (e) => {
    const { value } = e.target;
    const main = categoryList.find((c) => c.id === parseInt(value));

    setSubCategoryList(main.subCategories);
    setSelectedMain(value);
    setSelectedSub("");
  };

  const handleImagesSelect = (index, file) => {
    setImageListFile((prev) => {
      const newList = [...prev];
      newList[index] = file;
      return newList;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 체크
    const v = ProductValidateCheck(inputField, formData);
    if (!v.result) return Swal.fire(v.message);

    // 이미지 필수 체크
    if (mode === "add") {
      if (!imageListFile[0])
        return Swal.fire({ icon: "warning", text: "상품 이미지를 등록하세요" });
    } else {
      if (!imageListFile[0] && !existingImages[0])
        return Swal.fire({ icon: "warning", text: "상품 이미지를 등록하세요" });
    }

    onSubmit(formData, imageListFile);
  };

  return {
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
  };
}
