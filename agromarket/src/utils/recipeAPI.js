// utils
import { api } from "shared/lib/axios.js";


export const getRecipeListAPI = async (subId) => {
  const result = await api.get(`/recipe/list?subId=${subId}`);
  return result.data;
};
export const getRecipeDetailAPI = async (id) => {
  const url = `/recipe/${id}`;
  const result = await api.get(url);
  return result.data;
};

export const postRecipeReviewAPI = async (recipeId, rating, content) => {
  const stored = JSON.parse(localStorage.getItem("loginInfo"));
  const accessToken = stored?.accessToken;

  const result = await api.post(
    `/recipe/${recipeId}/review`,
    { rating, content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
  );
  return result;
};