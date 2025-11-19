import { axiosGet } from "shared/lib/axiosInstance"
import { setNoticeList } from "./noticeSlice";

export const setNoticeListAPI = () => async(dispatch) => {
    const result = await axiosGet("http://localhost:8080/notice/all");
    dispatch(setNoticeList({"result" : result}));
}