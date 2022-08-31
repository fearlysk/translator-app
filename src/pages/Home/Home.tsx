import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearTranslation, fetchData, addToFavorites, addToRecentTranslations } from "../../store/reducers/translations/translationsReducer";
import { IFetchQueries } from "../../../src/interfaces/IFetchQueries";
import TextField from '../../components/TextField/TextField';
import TextFieldSkeleton from "../../components/TextFieldSkeleton/TextFieldSkeleton";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import Arrows from "../../components/Arrows/Arrows";
import Copy from "../../components/Copy/CopyIcon/Copy";
import CopiedPopUp from "../../components/Copy/CopiedPopUp/CopiedPopUp";
import AddToFavPopUp from "../../components/AddToFavPopUp/AddToFavPopUp";
import { IPageProps } from "../../interfaces/IPageProps";
import './home.scss';
import 'react-loading-skeleton/dist/skeleton.css';

function Home({darkMode}: IPageProps) {

  const translation = useAppSelector((state) => state.translations.translation);
  const detectedLanguage = useAppSelector((state) => state.translations.detectedLanguage);
  const dispatch = useAppDispatch();

  let [queryText, setQueryText] = useState<string>("");
  let [selectedLanguage, setSelectedLanguage] = useState<string>("ru");
  let [inputLanguage, setInputLanguage] = useState<string>("en");
  let [copiedPopUp, setCopiedPopUp] = useState<boolean>(false);
  let [addedToFavPopUp, setAddedToFavPopUp] = useState<boolean>(false);

  const params: IFetchQueries = {
    text: queryText,
    lang: selectedLanguage
  }

  const switchLanguages = () => {
    setSelectedLanguage(inputLanguage);
    setInputLanguage(selectedLanguage);
    setQueryText(translation);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translation);
    setCopiedPopUp(true);
    setTimeout(() => setCopiedPopUp(false), 1000);
  }

  const addTranslationToFavorites = () => {
    if(queryText && translation) {
     const favoriteTranslation = {
        from: inputLanguage,
        text: queryText,
        to: selectedLanguage,
        translation: translation
    }
     dispatch(addToFavorites(favoriteTranslation));
     setAddedToFavPopUp(true);
     setTimeout(() => setAddedToFavPopUp(false), 1000);
    }
  }

  const addTranslationToRecent = () => {
    if(queryText && translation) {
      const recentTranslation = {
         from: inputLanguage,
         text: queryText,
         to: selectedLanguage,
         translation: translation
      }
      dispatch(addToRecentTranslations(recentTranslation));
    }
  }

  useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    setQueryText(queryText);
    if(queryText !== "") {
      dispatch(fetchData(params));
      addTranslationToRecent();
    } else {
      dispatch(clearTranslation());
    }
  }, 700)

   return () => clearTimeout(delayDebounceFn)
  }, [queryText, selectedLanguage, translation])

  return (
    <div className={darkMode ? "wrapper__dark" : "wrapper"}>
       
      <div className="fields__wrapper">
 
        <div className="options-field">
          <LanguageSelect selectedLanguage={inputLanguage} setSelectedLanguage={setInputLanguage} darkMode={darkMode} />
          <button className="options-field__fav" onClick={() => switchLanguages()}><Arrows darkMode={darkMode} /></button>
          <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} darkMode={darkMode} />
        </div>

        <div className="translation-fields">
          <div className="translation-field">
            <TextField queryText={queryText} setQueryText={setQueryText} disabled={false} placeholder=" Text to translate..."  darkMode={darkMode} /> 
          </div>
          <div className="translation-field__output">
            {queryText && !translation ? <TextFieldSkeleton /> : <TextField queryText={translation} setQueryText={setQueryText} disabled={true} placeholder=" Translation..."  darkMode={darkMode} />}
          </div>
        </div>

      </div>
        
        <div className="secondary-options-field">
          
          <div className="secondary-options">
             <div><Link className={darkMode ? "fav-link__dark" : "fav-link"} to="favorites">View favorite translations &#9733;</Link></div>
             <div><Link className={darkMode ? "history-link__dark" : "history-link"} to="history">View history &#x270E;</Link></div>
             <div>{translation && queryText ? <span className={darkMode ? "detected-lang__dark" : "detected-lang"}>Language: {detectedLanguage}</span> : null}</div>
          </div>
          
          {addedToFavPopUp ? <div className="secondary-options-field__added-to-fav"><AddToFavPopUp /></div> : null}
          {queryText && translation ? <div><button className={darkMode ? "add-to-fav__dark" : "add-to-fav"} onClick={() => addTranslationToFavorites()}>Add to favorites</button></div> : null}
          
          <div className="secondary-options-field__copy--wrapper">
            {copiedPopUp ? <div className="secondary-options-field__copied"><CopiedPopUp /></div> : null }
            <div><button className="secondary-options-field__copy" onClick={() => copyToClipboard()}><Copy darkMode={darkMode} /></button></div>
          </div>
        
        </div>
        
          {/[a-zA-Z]/.test(queryText) && inputLanguage === "ru" ? <div className={darkMode ? "switch-lang-tooltip__dark" : "switch-lang-tooltip"}><h3> &#x2757; Your keyboard layout differs from selected language: <button className={darkMode ? "switch-btn__dark" : "switch-btn"} onClick={() => switchLanguages()}>Switch</button></h3></div> : null}
          {/[а-яА-Я]/.test(queryText) && inputLanguage !== "ru" ? <div className={darkMode ? "switch-lang-tooltip__dark" : "switch-lang-tooltip"}><h3> &#x2757; Your keyboard layout differs from selected language: <button className={darkMode ? "switch-btn__dark" : "switch-btn"} onClick={() => switchLanguages()}>Switch</button></h3></div> : null}
      
    </div>
  );
}

export default Home;
