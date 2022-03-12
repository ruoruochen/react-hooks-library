/*
 * @Author: ruoruochen
 * @Date: 2022-03-09 09:20:31
 * @LastEditTime: 2022-03-12 16:17:06
 * @Description:
 */
import React from "react";
import { useSlider } from "../useSlider";
import "./index.css";

export default function UseSlideDemo() {
  const [hotAreaProps, thumbProps, sliderState] = useSlider({
    initValue: 10,
    horizon: true,
    min: 0,
    max: 20,
  });
  const { value } = sliderState;
  return (
    <>
      <div className="header">
        <h1>最小值：0; </h1>
        <h1>最大值：20;</h1>
        <h1>value:{value}</h1>
      </div>
      <div className="slider">
        <div className="track" {...hotAreaProps}></div>
        <div className="process" style={{ width: `${(value / 20) * 100}%` }}>
          <div className="circle" {...thumbProps}></div>
        </div>
      </div>
    </>
  );
}
