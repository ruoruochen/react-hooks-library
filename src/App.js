import { Routes, Route } from "react-router";

import { routeList } from "./routes";
import "./App.css";

function App() {
  return (
    <Routes>
      {routeList.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        ></Route>
      ))}
    </Routes>
  );
}

export default App;
