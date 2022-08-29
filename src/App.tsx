import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../src/pages/Home/Home';
import Favorites from "./pages/Favorites/Favorites";
import routes from "../src/constants/routes";
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path={routes.HOME} element={<Home />} />
       <Route path={routes.FAVORITES}  element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
