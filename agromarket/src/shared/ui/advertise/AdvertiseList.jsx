import React, { useEffect, useState } from "react";
import "./advertise.css";

export function AdvertiseList({ ads, interval = 3000, random = false }) {
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
    <div className="advertise-list">
      <a href={ad.advLink} target="_blank" rel="noreferrer">
        <img
          className="advertise-inline"
          src={ad.advImageInline}
          alt={ad.advName}
        />
      </a>
    </div>
  );
}
