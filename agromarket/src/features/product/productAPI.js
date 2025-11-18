import { axiosGet, axiosGetParams, axiosPostFile } from "shared/lib/axiosInstance";
import {
  setProductList,
  setProduct,
  setProductReviewList,
  setProductQnAList
} from "./productSlice";
import { parseJwt } from "features/auth/parseJwt";
import { api } from "features/auth/axios";

export const setProductListAPI = (keyword) => async (dispatch) => {
  const result = await axiosGet("/product/productList");
  if (result !== null && Array.isArray(result)) {
    dispatch(setProductList({ result: result }));
  }
};

export const setProductAPI = (id) => async (dispatch) => {
  const url = "/product/productDetail";
  const params = { "id" : id };
  
  // const jsonData = await axiosGetParams(url, { params });
  const jsonData = await api.get(url, { params });
  // null이 아닐경우만 실행
  if(jsonData && Object.keys(jsonData).length > 0){
    dispatch(setProduct({ product: jsonData.data }));
  }
};

export const setProductReviewListAPI = () => async (dispatch) => {
  try {
    const result = await axiosGet(
      "/product/productReviewList"
    );

    // ✅ 문자열 JSON → 실제 배열로 변환
    const parsed = result.map((item) => ({
      ...item,
      images:
        typeof item.images === "string" ? JSON.parse(item.images) : item.images,
      tags: typeof item.tags === "string" ? JSON.parse(item.tags) : item.tags,
    }));

    // ✅ Redux에 저장
    dispatch(setProductReviewList({ result: parsed }));
  } catch (error) {
    console.error("리뷰 데이터 불러오기 실패:", error);
  }
};

export const setProductQnAListAPI = () => async (dispatch) => {
  const result = await axiosGet("/product/productQnAList");
  dispatch(setProductQnAList({"result" : result}));
};


export const setProductBestListAPI = async() =>  {
    const result = await axiosGet("/product/productBestList");
    return result;
}

// 상품 정보 등록
export const setProductData = async(formData, imageListFile, isNew, id, maxImagelength) => {
  // 토큰 확인
  const stored = localStorage.getItem("loginInfo");

  if (stored) {
    let url ="";

    // 토큰에서 user의 id취득
    const { accessToken } = JSON.parse(stored);
    const payload = parseJwt(accessToken);

    // 이미지 전송을 위한 FormData
    const data = new FormData();

    // user의 id설정
    formData = {...formData, "user": { "id": payload.id } };

    // 이미지 파일 추가    
    for (let i = 0; i < maxImagelength; i++) {
      if (imageListFile[i]) {
        data.append("files", imageListFile[i]);
      } else {
        data.append("files", new Blob([]));
      }
    }

    // 신규 등록일경우
    if(isNew){
      // 상품 등록 URL
      url = "/product/productAdd";
    } else {
      // 상품 수정 URL
      url = "/product/productUpdate";
      // 상품의 id설정
      formData = {...formData, "id": id  };
    }

    // formData설정(String타입으로 전송)
    data.append("product", JSON.stringify(formData));

    // // 상품 정보 DB에 업로드
    const result = await axiosPostFile(url, data);

    // 업로드 성공시 메세지 출력
    if (result) {
        return true;
    } else {
        return false;
    }
  }
}

// 상품 정보 등록
export const delProductData = async(productId) => {
  // 토큰 확인
  const stored = localStorage.getItem("loginInfo");

  if (stored) {
    const url = "/product/productDelete";
    const params = { "id" : productId };

    // 상품 정보 DB에 업로드
    const result = await api.get(url, { params });
    
    return result;
  }
}

// // 상품 디테일 정보 취득
// export const getProductDetail = (pid) => async (dispatch) => {
//   const url = "/product/detail";
//   const param = { pid: pid };
//   // const jsonData = await axiosGet(url, param); // detail 연동
//   // dispatch(setProduct());
// };
