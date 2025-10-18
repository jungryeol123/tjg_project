import React from "react";

import { SlideDots } from "./SlideDots";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoIosRadioButtonOn } from "react-icons/io";
import "./SlideContainer.scss";
import { SlideNavButton } from "./SlideNavButton";

export function SlideContainer({ images, index, setIndex }) {
    console.log("SlideNavButton:", SlideNavButton);
  return (
    <div className="slide-container">
      {images && images.map((img, i) => (
  <img
    key={i}
    src={img}
    alt=""
    className={`slide ${index === i ? "active" : ""}`}
  />
))}

      <SlideNavButton
        position="left"
        onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}
        icon={<MdOutlineArrowBackIosNew />}
      />

      <SlideNavButton
        position="right"
        onClick={() => setIndex((index + 1) % images.length)}
        icon={<MdOutlineArrowForwardIos />}
      />

      <SlideDots
        count={images.length}
        activeIndex={index}
        setIndex={setIndex}
        icon={<IoIosRadioButtonOn />}
      />
    </div>
  );
}
