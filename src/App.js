/* App.js */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Contents/Main";
import Model_all from "./Contents/Model_all";
import Model_pri from "./Contents/Model_pri";
import Model_rand from "./Contents/Model_rand";
import Model_scroll from "./Contents/Model_scroll";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Main />} />
        <Route path={`/model_all/`} element={<Model_all />} />
        <Route path={`/model_pri/`} element={<Model_pri />} />
        <Route path={`/model_rand/`} element={<Model_rand />} />
        <Route path={`/model_scroll/`} element={<Model_scroll />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
