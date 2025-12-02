import { useEffect, useState } from "react";
import { getData } from "shared/lib/axiosInstance";

export function useAdvertise() {
  const [advertiseList, setAdvertiseList] = useState([]);

  useEffect(() => {
    const fetchAdvertises = async () => {
      const adv = await getData("/advertise/list");
      setAdvertiseList(adv);
    };
    fetchAdvertises();
  }, []);

  const bannerAds = advertiseList.filter(ad => ad.advImageBanner);
  const inlineAds = advertiseList.filter(ad => ad.advImageInline);

  return { advertiseList, bannerAds, inlineAds };
}
