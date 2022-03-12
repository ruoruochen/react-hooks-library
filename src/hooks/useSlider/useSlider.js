import { useReducer, useEffect, useRef, useCallback } from "react";

// 保证值在范围内
const fixValue = (value, min, max) => Math.max(min, Math.min(max, value));

/**
 * State:{
 *  horizon, // Slider方向
 *  value, // 进度值
 *  lastPos, // 最近一次坐标值
 *  sliding, // 是否移动过程
 *  range, // 移动范围大小
 *  min, // Slider最小值
 *  max, // Slider最大值
 * }
 */
const reducer = (state, action) => {
  const { horizon, lastPos, value, range, min, max } = state;
  const { type, x, y, slideWidth, slideHeight } = action;

  let nowPos = 0,
    move = 0;
  switch (type) {
    case "start":
      return {
        ...state,
        lastPos: horizon ? x : y,
        sliding: true,
        range: horizon ? slideWidth : slideHeight,
      };
    case "move":
      // 只有点击之后 才去计算移动距离
      if (!state.sliding) {
        return state;
      }
      // 计算移动距离
      nowPos = horizon ? x : y;
      move = nowPos - lastPos;
      return {
        ...state,
        lastPos: nowPos,
        value: fixValue(value + (Math.ceil(move) / range) * max, min, max),
      };
    case "end":
      // 在移动过程 才去计算移动距离
      if (!state.sliding) {
        return state;
      }
      // 计算移动距离
      nowPos = horizon ? x : y;
      move = nowPos - lastPos;
      return {
        ...state,
        lastPos: nowPos,
        sliding: false,
        value: fixValue(value + (Math.ceil(move) / range) * max, min, max),
      };
    case "to":
      // 计算移动距离
      move = horizon ? x / slideWidth : y / slideHeight;
      return {
        ...state,
        lastPos: nowPos,
        sliding: false,
        value: fixValue(Math.ceil(move * max), min, max),
      };
    default:
      return state;
  }
};

/**
 * @description:
 * @param {*} horizon Slider方向
 * @param {*} initValue 初始值
 * @param {*} min Slider最小值
 * @param {*} max Slider最大值
 * @return {*}
 */
export function useSlider({ horizon, initValue, min, max }) {
  // 状态
  const [state, dispatch] = useReducer(reducer, {
    horizon,
    value: initValue,
    reset: true,
    min,
    max,
  });

  // 使用ref拿到使用该hooks的Dom元素
  const hotAreaRef = useRef(null);
  const thumbRef = useRef(null);

  // 点击圆球的回调
  const handleThumbMouseDown = useCallback((e) => {
    const hotArea = hotAreaRef.current;
    dispatch({
      type: "start",
      x: e.pageX,
      y: e.pageY,
      slideWidth: hotArea.clientWidth,
      slideHeight: hotArea.clientHeight,
    });
  }, []);

  const handleThumbMouseMove = useCallback((e) => {
    const hotArea = hotAreaRef.current;
    dispatch({
      type: "move",
      x: e.pageX,
      y: e.pageY,
      slideWidth: hotArea.clientWidth,
      slideHeight: hotArea.clientHeight,
    });
  }, []);

  // 点击热区的回调
  const handleHotAreaMouseDown = useCallback((e) => {
    const hotArea = hotAreaRef.current;
    dispatch({
      type: "to",
      x: e.nativeEvent.offsetX, //距离当前target目标的x
      y: e.nativeEvent.offsetY,
      slideWidth: hotArea.clientWidth,
      slideHeight: hotArea.clientHeight,
    });
  }, []);

  // 初始化 绑定事件监听
  useEffect(() => {
    const onSlideMove = (e) => {
      dispatch({ type: "move", x: e.pageX, y: e.pageY });
    };
    const onSlideEnd = (e) => {
      dispatch({ type: "end", x: e.pageX, y: e.pageY });
    };
    // 保证在热区之外移动时，也能够正常移动。
    document.addEventListener("mouseup", onSlideEnd);
    document.addEventListener("mousemove", onSlideMove);

    return () => {
      document.removeEventListener("mouseup", onSlideEnd);
      document.removeEventListener("mousemove", onSlideMove);
    };
  }, []);

  /*
  返回三个对象
  1. 热区属性：ref引用，热区点击回调
  2. 进度条属性：ref引用，热区点击、移动回调
  3. 整体状态：value进度值
  */
  return [
    { ref: hotAreaRef, onMouseDown: handleHotAreaMouseDown },
    {
      ref: thumbRef,
      onMouseDown: handleThumbMouseDown,
      onMouseMove: handleThumbMouseMove,
    },
    { value: state.value },
  ];
}
