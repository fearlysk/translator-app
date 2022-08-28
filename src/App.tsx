import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../src/store/hooks';
import { clearTranslation, fetchData } from "./store/reducers/translations/translationsSlice";
import { IFetchQueries } from "../src/interfaces/IFetchQueries";
import TextField from './components/TextField/TextField';
import LanguageSelect from "./components/LanguageSelect/LanguageSelect";
import './App.scss';

function App() {

  let [queryText, setQueryText] = useState<string>("");
  let [selectedLanguage, setSelectedLanguage] = useState<string>("ru");

  const translation = useAppSelector((state) => state.translations.translation);
  const detectedLanguage = useAppSelector((state) => state.translations.detectedLanguage);
  const dispatch = useAppDispatch();
  
  const params: IFetchQueries = {
    text: queryText,
    lang: selectedLanguage
  }

  useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    setQueryText(queryText);
    if(queryText !== "") {
        dispatch(fetchData(params));
    } else {
      dispatch(clearTranslation());
    }
   
  }, 1000)
  
   return () => clearTimeout(delayDebounceFn)
  }, [queryText, selectedLanguage])

  return (
    <div className="App">
      <div>
        <TextField queryText={queryText} setQueryText={setQueryText} />
        <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        <p>{translation && queryText ? `Detected language: ${detectedLanguage}` : null}</p>
        <p>{translation && queryText ? translation : null}</p>
      </div>
    </div>
  );
}

export default App;
