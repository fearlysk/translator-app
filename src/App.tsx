// import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../src/store/hooks';
import './App.scss';
import { fetchData } from "./store/reducers/translations/translationsSlice";
import { IFetchQueries } from "../src/interfaces/IFetchQueries";

function App() {
  
  const translation = useAppSelector((state) => state.translations.translation);
  const dispatch = useAppDispatch();

  const lang = "de";
  const text = "Hello, people!";
  
  const params: IFetchQueries = {
    text,
    lang
  }

  const translateText = () => {
    dispatch(fetchData(params));
  }

  return (
    <div className="App">
      <h1>{translation}</h1>
      <button onClick={() => translateText()}>API test</button>
    </div>
  );
}

export default App;
