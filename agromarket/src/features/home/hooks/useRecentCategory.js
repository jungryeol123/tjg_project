import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { parseJwt } from "features/auth/parseJwt";
import { fetchRecentSubCategory } from "features/product/productAPI";

export function useRecentCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("loginInfo");
    if (!stored) return;

    const { accessToken } = JSON.parse(stored);
    const payload = parseJwt(accessToken);

    dispatch(fetchRecentSubCategory(payload.id));
  }, [dispatch]);
}
