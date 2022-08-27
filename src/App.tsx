import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../src/store/hooks';
import { fetchData } from "./store/reducers/translations/translationsSlice";
import { IFetchQueries } from "../src/interfaces/IFetchQueries";
import TextField from './components/TextField/TextField';
import './App.scss';

function App() {

  const [queryText, setQueryText] = useState<string>("");

  const translation = useAppSelector((state) => state.translations.translation);
  const dispatch = useAppDispatch();

  const lang = "de";
  
  const params: IFetchQueries = {
    text: queryText,
    lang
  }

  const translateText = () => {
    setQueryText(queryText);
    dispatch(fetchData(params));
  }

  return (
    <div className="App">
      <div>
        <TextField queryText={queryText} setQueryText={setQueryText}/>
        <button onClick={() => translateText()}>Translate</button>
        <p>{translation}</p>
      </div>
    </div>
  );
}

export default App;
