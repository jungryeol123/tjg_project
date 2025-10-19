import React from "react";

import { SlideDots } from "./SlideDots";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { IoIosRadioButtonOn } from "react-icons/io";
import "./SlideContainer.scss";
import { SlideNavButton } from "./SlideNavButton";

export function SlideContainer({ images, index, setIndex }) {
  return (
    <div className="slide-container">
      {images &&
        images.map((img, i) => (
          <div
            key={i}
            className={`slide-wrapper ${index === i ? "active" : ""}`}
          >
            <img
              src={img}
              alt={`슬라이드-${i}`}
              className="slide-image"
            />
          </div>
        ))}

      {/* <SlideNavButton
        position="left"
        onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)}
        icon={<MdOutlineArrowBackIosNew />}
      />

      <SlideNavButton
        position="right"
        onClick={() => setIndex((index + 1) % images.length)}
        icon={<MdOutlineArrowForwardIos />}
      /> */}

      <SlideDots
        count={images.length}
        activeIndex={index}
        setIndex={setIndex}
        icon={<IoIosRadioButtonOn />}
      />
    </div>
  );
}
