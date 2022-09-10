import { useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../src/pages/Home/Home';
import Favorites from "./pages/Favorites/Favorites";
import History from "./pages/History/History";
import routes from "../src/constants/routes";
import "../src/styles/app.scss";

function App() {

  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="container">
        <span className="toggle-icon" style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"></span>
          </label>
        </div>
        <span className="toggle-icon" style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
      </div>
      <HashRouter>
        <Routes>
         <Route path={routes.HOME} element={<Home darkMode={darkMode}/>} />
         <Route path={routes.FAVORITES} element={<Favorites darkMode={darkMode} />} />
         <Route path={routes.HISTORY} element={<History darkMode={darkMode} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
