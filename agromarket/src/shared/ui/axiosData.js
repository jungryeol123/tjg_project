import axios from 'axios';

export const getJsonData = async (url) => {
    const axiosData = await axios.get(url);
    const jsonData = await axiosData.data;
    return jsonData;
}