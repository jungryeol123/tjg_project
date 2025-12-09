import { useEffect, useState } from "react";
import { getRecipeListAPI } from "utils/recipeAPI";

export function useRecipeList(selectedSub) {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    if (!selectedSub) return;

    const fetch = async () => {
      const result = await getRecipeListAPI(selectedSub);
      setRecipeList(result);
    };

    fetch();
  }, [selectedSub]);

  return recipeList;
}
