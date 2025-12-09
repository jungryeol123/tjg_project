import { useEffect, useState } from "react";

export function useHomePopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isShown = localStorage.getItem("coupon_popup_shown");
    if (!isShown) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    localStorage.setItem("coupon_popup_shown", "true");
    setShowPopup(false);
  };

  return { showPopup, handleClosePopup };
}
