import { useEffect, useState } from "react";
import { api } from "shared/lib/axios";

export function useAdvertiseList() {
  const [advertiseList, setAdvertiseList] = useState([]);

  useEffect(() => {
    const fetchAdvertises = async () => {
      const res = await api.get("/advertise/list");
      setAdvertiseList(res.data);
    };
    fetchAdvertises();
  }, []);

  const bannerAds = advertiseList.filter(ad => ad.advImageBanner !== null);
  const inlineAds = advertiseList.filter(ad => ad.advImageInline !== null);

  return { bannerAds, inlineAds };
}
