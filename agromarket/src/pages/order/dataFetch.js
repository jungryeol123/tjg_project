import axios from 'axios';

/**
 * 배열의 rows 그룹핑
 */
export const groupByRows = (array, number) => {
    //출력 포맷 함수 : 한줄에 상품 3개씩 출력
    // const rows = [];  // [ [{}, {}, {}], [{}, {}, {}], [{}] ]
    // for(let i=0; i<list.length; i+=3) {
    //     rows.push(list.slice(i, i+3)); //0~2, slice 새로운 배열 반환
    // }

    const rows = array.reduce((acc, cur, idx) => {
        if(idx % number === 0) acc.push([cur])
        else acc[acc.length-1].push(cur);
        return acc;
    }, []);

    return rows;
}

/**
 * axiosGet 함수를 이용하여 백엔드 연동 처리
 */
export const axiosGet = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

/**
 * axiosPost 함수를 이용하여 백엔드 연동 처리
 */
export const axiosPost = async (url, formData) => {
    const response = await axios.post(url, formData, { "Content-Type": "application/json" });
    /* const response = await axios({
        method: "POST",
        url: url,
        headers: { "Content-Type": "application/json" },
        data: formData
    }); */
    return response.data;
}

/**
 * axios 함수를 이용하여 데이터 가져오기
 */
export const axiosData = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

/**
 * fetch 함수를 이용하여 데이터 가져오기
 */
export const fetchData = async (url) => {
    const response = await fetch(url);
    const jsonData = await response.json(); 
    return jsonData;
}

