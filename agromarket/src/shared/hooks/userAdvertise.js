import { useEffect, useState } from "react";
// shared
import { api } from "shared/lib/axios";

export function useAdvertise() {
  const [advertiseList, setAdvertiseList] = useState([]);

  useEffect(() => {
    const fetchAdvertises = async () => {
      const adv = await api.get("/advertise/list");
      setAdvertiseList(adv.data);
    };
    fetchAdvertises();
  }, []);

  const bannerAds = advertiseList.filter(ad => ad.advImageBanner);
  const inlineAds = advertiseList.filter(ad => ad.advImageInline);

  return { advertiseList, bannerAds, inlineAds };
}
