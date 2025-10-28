import axios from 'axios';
/**
 * 배열의 rows 그룹핑
 */
 // axiosPost 함수를 이용하여 벡엔드 연동 처리
 export const axiosGet = async (url) => {
     const response = await axios.get(url);
     return response.data;
 }

export const groupByRows = (array,number) => {
    //출력 포멧 함수 : 한줄에 상품 3개씩 출력
          // const rows = [];
          // for (let i =0 ; i <= list.length; i += 3) {
          //   rows.push(list.slice(i,i+3));
          // }
          const rows = array.reduce((acc,cur,idx) => {
            if(idx % number === 0) acc.push([cur]);
            else acc[acc.length-1].push(cur);
            return acc;
          },[]);
          return rows;
}

// axiosPost 함수를 이용하여 벡엔드 연동 처리
export const axiosPost = async (url,formData) => {
    const response = await axios.post(url,formData,{"Content-Type":"application/json"});
//    console.log(response);
    //    const result = await axiosPost({
    //            method: "POST",
    //            url : url,
    //            header : {"Content-Type":"application/json"},
    //            data : formData
    //    });
    return response.data;
}
export const axiosData = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

/**
 * fetch 함수를 이용하여 데이터 가져오기
 */
export const fetchData = async (url) => {
      const response = await fetch(url);
      const jsonData = await response.json(); //json 타입으로 파싱
      return jsonData;
}