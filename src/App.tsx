import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../src/store/hooks';
import { clearTranslation, fetchData } from "./store/reducers/translations/translationsSlice";
import { IFetchQueries } from "../src/interfaces/IFetchQueries";
import 'react-loading-skeleton/dist/skeleton.css';
import TextField from './components/TextField/TextField';
import TextFieldSkeleton from "./components/TextFieldSkeleton/TextFieldSkeleton";
import LanguageSelect from "./components/LanguageSelect/LanguageSelect";
import './App.scss';

function App() {

  let [queryText, setQueryText] = useState<string>("");
  let [selectedLanguage, setSelectedLanguage] = useState<string>("ru");
  let [inputLanguage, setInputLanguage] = useState<string>("en");

  const translation = useAppSelector((state) => state.translations.translation);
  const detectedLanguage = useAppSelector((state) => state.translations.detectedLanguage);
  const dispatch = useAppDispatch();
  
  const params: IFetchQueries = {
    text: queryText,
    lang: selectedLanguage
  }

  const switchLanguages = () => {
    setSelectedLanguage(inputLanguage);
    setInputLanguage(selectedLanguage);
    setQueryText(translation);
  }

  const setRu = () => {
    setInputLanguage("ru");
  }
  const setEng = () => {
    setInputLanguage("en");
  }

  useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    setQueryText(queryText);
    if(queryText !== "") {
        dispatch(fetchData(params));
    } else {
      dispatch(clearTranslation());
    }
   
  }, 500)
  
   return () => clearTimeout(delayDebounceFn)
  }, [queryText, selectedLanguage])

  return (
    <div className="App">
      <div>
        <LanguageSelect selectedLanguage={inputLanguage} setSelectedLanguage={setInputLanguage} />
        <TextField queryText={queryText} setQueryText={setQueryText} disabled={false}/>
        <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        <br />
       
        {/[a-zA-Z]/.test(queryText) && inputLanguage === "ru" ? <h3>Change language: <button onClick={() => setEng()}>English</button></h3> : null}
        {/[а-яА-Я]/.test(queryText) && inputLanguage !== "ru" ? <h3>Change language: <button onClick={() => setRu()}>Russian</button></h3> : null}
      
        <br />
        <button onClick={() => switchLanguages()}>Switch languages</button>
        <br />
        {queryText && !translation ? <TextFieldSkeleton /> : <TextField queryText={translation} setQueryText={setQueryText} disabled={true}/>}
        <p>{translation && queryText ? `Detected language: ${detectedLanguage}` : null}</p>
      </div>
    </div>
  );
}

export default App;
