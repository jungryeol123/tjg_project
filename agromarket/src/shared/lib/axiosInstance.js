import axios from "axios";
/**
 * KAMIS API - 일일 시세 데이터 호출 (일반 axios 요청용)
 * @param {Object} params
 * @param {string} params.categoryCode 품목 코드 (예: 100=채소류, 200=과일류)
 * @param {string} params.productClsCode 상품 구분 (01=농산물, 02=축산물, 03=수산물)
 * @param {string} params.countryCode 시장 코드 (1101=서울 가락시장 등)
 * @param {string} params.date 조회 날짜 (YYYYMMDD)
 */
export async function getKamisData({
    categoryCode,
    productClsCode,
    countryCode,
    date,
}) {
    const url = "https://www.kamis.or.kr/service/price/xml.do";
    const kamisKey = process.env.REACT_APP_KAMIS_API_KEY;
    const apiId = process.env.REACT_APP_API_ID;
    const queryParams = {
        action: "dailyPriceByCategoryList",
        p_product_cls_code: productClsCode,
        p_country_code: countryCode,
        p_regday: date,
        p_convert_kg_yn: "N",
        p_item_category_code: categoryCode,
        p_cert_key: kamisKey,
        p_cert_id: apiId,
        p_returntype: "json",
    };

    // try {
    //     const response = await axios.get(url, { params: queryParams });
    //     console.log("✅ KAMIS API 응답:", response.data);
    //     return response.data;
    // } catch (error) {
    //     console.error("🚨 KAMIS API 오류:", error);
    //     throw error;
    // }

    
    try {
        const response = await axios.get("data/kamisDataVegetable.json");
        console.log("✅ KAMIS API 응답:", response.data);
        return response.data;
    } catch (error) {
        console.error("🚨 KAMIS API 오류:", error);
        throw error;
    }
}


export async function getData(url
) {

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("데이터 오류", error);
        throw error;
    }
}

