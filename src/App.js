/* App.js */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Contents/Main";
import Login from "./Contents/Login";
import Model_all from "./Contents/Model_all";
import Model_pri from "./Contents/Model_pri";
import Model_rand from "./Contents/Model_rand";
import Model_scroll from "./Contents/Model_scroll";
import Graph_bar from "./Contents/Graph_bar";
import Graph_circle from "./Contents/Graph_circle";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Login />} />
        <Route path={`/main/`} element={<Main />} />
        <Route path={`/main/model_all/`} element={<Model_all />} />
        <Route path={`/main/model_pri/`} element={<Model_pri />} />
        <Route path={`/main/model_rand/`} element={<Model_rand />} />
        <Route path={`/main/model_scroll/`} element={<Model_scroll />} />
        <Route path={`/main/graph_bar/`} element={<Graph_bar />} />
        <Route path={`/main/graph_circle/`} element={<Graph_circle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
