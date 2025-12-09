import { useEffect, useState } from "react";
import { api } from "shared/lib/axios";
import { useAutoSlider } from "shared/hooks/useAutoSlider";

export function useHomeImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("/data/homeDataImages.json");
      setImages(result.data.images);
    };
    fetchData();
  }, []);

  const { index, setIndex } = useAutoSlider(images.length, 5000);

  return { images, index, setIndex };
}
