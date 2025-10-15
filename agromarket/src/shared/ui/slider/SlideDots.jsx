import React from "react";
import "./SlideDots.scss";

export function SlideDots({ activeIndex, count, setIndex, icon }) {
  return (
    <div className="slide-dots">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          onClick={() => setIndex(i)}
          className={`dot ${activeIndex === i ? "active" : ""}`}
        >
          {icon ?? "●"}
        </span>
      ))}
    </div>
  );
}