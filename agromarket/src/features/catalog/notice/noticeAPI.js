import { axiosGet } from "shared/lib/axiosInstance"
import { setNoticeList } from "./noticeSlice";

export const setNoticeListAPI = () => async(dispatch) => {
    const result = await axiosGet("http://localhost:8080/notice/all");
    console.log("notice", result, typeof result);
    dispatch(setNoticeList({"result" : result}));
}