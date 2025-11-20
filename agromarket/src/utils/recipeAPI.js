import axios from "axios";
import { axiosGet } from "shared/lib/axiosInstance";


export const getRecipeListAPI = async (subId) => {
  return await axiosGet(`/recipe/list?subId=${subId}`);
};
export const getRecipeDetailAPI = async (id) => {
  const url = `/recipe/${id}`;
  const result = await axiosGet(url);
  return result;
};



export const postRecipeReviewAPI = async (recipeId, rating, content) => {
  const stored = JSON.parse(localStorage.getItem("loginInfo"));
  const accessToken = stored?.accessToken;

  return await axios.post(
    `/recipe/${recipeId}/review`,
    { rating, content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
  );
};