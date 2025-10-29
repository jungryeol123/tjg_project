import { login,logout } from "./authSlice.js";
import { validateFormCheck,validateSignupFormCheck } from "./validate.js";
import { axiosPost } from "./dataFetch.js";

export const getLogin = (formData, param) => async(dispatch) => {
//        console.log(formData.id, param);
 if(validateFormCheck(param)) {

    /**
        springboot - @RestController, @PostMapping("/member/login")
        axios API (**fetch = body, axios = data)
    */
    const url = "/member/login";
    const result = await axiosPost(url,formData);

    if(result){
           //로그인 성공
           dispatch(login({"userId":formData.id}));
           return true;
            }
        }
        return false;
}
/**
    id중복 체크
*/
export const getIdCheck = (id) => async(dispatch) => {
    const data = {"id":id};
    const url = "/member/idcheck";
    const result = await axiosPost(url,data);
    return result;
}


/**
    signup
*/
export const getSignup = (formData, param) => async(dispatch) => {
    let result = null;
    // if(validateSignupFormCheck(param)) {
        const url = "/member/signup"
        result = await axiosPost(url,formData);
    // }
    return result;
}

/**
    login
*/
export const getLogout = () => async (dispatch) => {
    dispatch(logout());
    return true;
}