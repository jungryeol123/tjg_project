import { axiosGet } from "shared/lib/axiosInstance"
import { setNoticeList } from "./noticeSlice";

export const setNoticeListAPI = () => async(dispatch) => {
    const result = await axiosGet("/data/notices.json");
    console.log("notice", result);
    dispatch(setNoticeList({"result" : result}));
}