import React, { useRef } from "react";
import { useState, useEffect } from "react";
import s from "../AllCssFile/ImageSlider.module.css";
import img1 from "../assets/img1.png";
import slider2 from "../assets/slider2.png";

const ImagaSlider = () => {
  const slider = [img1, slider2];
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    setAnimating(true); // start the slide animation

    setTimeout(() => {
      // update image after animation
      setCount((preVal) => (preVal === slider.length - 1 ? 0 : preVal + 1));
      setAnimating(false); // stop the animation
    }, 300); // match this with CSS animation duration
  };

  const handlePrevious = () => {
    if (count === 0) {
      setCount(slider.length - 1);
    } else {
      setCount(count - 1);
    }
  };
  useEffect(() => {
    ref.current = setInterval(handleNext, 2000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);
  return (
    <>
      <div
        className={s.heroContainer}
        onMouseEnter={() => {
          clearInterval(ref.current);
        }}
        onMouseLeave={() => {
          clearInterval(ref.current); // clear old one
          ref.current = setInterval(handleNext, 2000); // set new one
        }}
      >
        <div className={s.leftButton}>
          <button onClick={handlePrevious}>{"<"}</button>
        </div>
        <div className={`${s.herodiv} ${animating ? s.slideLeft : ""} `}>
          <img src={slider[count]} className={`${s.heroImage}`} alt="image" />
        </div>
        <div className={s.rightButton}>
          <button onClick={handleNext}>{">"}</button>
        </div>
      </div>
    </>
  );
};

export default ImagaSlider;
