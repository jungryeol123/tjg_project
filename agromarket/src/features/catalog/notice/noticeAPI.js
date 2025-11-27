import { setNoticeList } from "./noticeSlice";
// shared
import { axiosGet } from "shared/lib/axiosInstance"

export const setNoticeListAPI = () => async(dispatch) => {
    const result = await axiosGet("http://localhost:8080/notice/all");
    dispatch(setNoticeList({"result" : result}));
}