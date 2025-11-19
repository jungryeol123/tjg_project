import axios from "axios";
/**
 * KAMIS API - 일일 시세 데이터 호출 (일반 axios 요청용)
 * @param {Object} params
 * @param {string} params.categoryCode 품목 코드 (예: 100=채소류, 200=과일류)
 * @param {string} params.productClsCode 상품 구분 (01=농산물, 02=축산물, 03=수산물)
 * @param {string} params.countryCode 시장 코드 (1101=서울 가락시장 등)
 * @param {string} params.date 조회 날짜 (YYYYMMDD)
 */
export async function getData(url) {
    try {
        const response = await axios.get(url);
        console.log("✅ KAMIS API 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("🚨 KAMIS API 오류:", error);
        throw error;
    }
}

export async function axiosGet(url) {

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("데이터 오류", error);
        throw error;
    }
}

// post방식
export async function axiosPost(url, params) {
    try {
        const response = await axios.post(url, params);
        return response.data;
    } catch (error) {
        console.error("데이터 오류", error);
        throw error;
    }
}

// post방식(파일 전송)
export async function axiosPostFile(url, params) {
    try {
        const response = await axios.post(url, params);

        return response.data;
    } catch (error) {
        console.error("데이터 오류", error);
        throw error;
    }
}

// get방식 params 보내기
export async function axiosGetParams(url, params) {

    try {
        const response = await axios.get(url, params);
        return response.data;
    } catch (error) {
        console.error("데이터 오류", error);
        throw error;
    }
}
