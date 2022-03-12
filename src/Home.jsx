/*
 * @Author: your name
 * @Date: 2022-03-09 09:49:13
 * @LastEditTime: 2022-03-12 13:53:39
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /person/react-hooks-library/src/Home.jsx
 */
import React from "react";
import { Link } from "react-router-dom";
import { routeList } from "./routes";
export default function Home() {
  return (
    <div>
      {routeList.map((route) => (
        <Link to={route.path} key={route.path}>
          {route.path}
        </Link>
      ))}
    </div>
  );
}
