

export const getProduct = async (formData, idRef, pwdRef, setText) => {
    const url = "http://localhost:8080/product/detail";
    const request = await axiosPost(url, formData);

    if(request) {
        dispatch(login({"userId":formData.id})); // 비동기
        result = true;
    }

    return result;
}
