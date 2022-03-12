/*
 * @Author: your name
 * @Date: 2022-03-08 23:22:32
 * @LastEditTime: 2022-03-12 13:53:12
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /person/react-hooks-library/src/routes/index.js
 */
import { PATH } from "./paths";
import { PAGE } from "./pages";

export const routeList = [
  { path: "/", element: PAGE.Home },
  { path: PATH.useSlider, element: PAGE.UseSliderExample },
];
