import React, { useEffect, useState } from "react";
import "./advertise.css";

export function RightAdBanner({ ads, interval = 3000, random = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!ads || ads.length === 0) return;

    const timer = setInterval(() => {
      setIndex(prev => {
        if (random) {
          return Math.floor(Math.random() * ads.length); 
        }
        return (prev + 1) % ads.length;   
      });
    }, interval);

    return () => clearInterval(timer);
  }, [ads, interval, random]);

  if (!ads || ads.length === 0) return null;

  const ad = ads[index];

  return (
    <div className="right-ad-banner">
      <a href={ad.advLink} target="_blank" rel="noreferrer">
        <img 
          className="banner-img"
          src={ad.advImageBanner}
          alt={ad.advName}
        />
      </a>
    </div>
  );
}
