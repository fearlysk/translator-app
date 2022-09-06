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
import { ITranslation } from "../../interfaces/ITranslation";
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
  let [langsSwitching, setLangsSwitching] = useState<boolean>(false);

  const params: IFetchQueries = {
    text: queryText,
    lang: selectedLanguage
  }

  const switchLanguages = () => {
    setSelectedLanguage(inputLanguage);
    setInputLanguage(selectedLanguage);
    setQueryText(translation);
    setLangsSwitching(true);
    setTimeout(() => setLangsSwitching(false), 1000);
  }

  const setDetectedLanguage = () => {
    setInputLanguage(detectedLanguage);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translation);
    setCopiedPopUp(true);
    setTimeout(() => setCopiedPopUp(false), 1000);
  }

  const addTranslationToFavorites = () => {
    if(queryText && translation && detectedLanguage !== selectedLanguage) {
     const favoriteTranslation: ITranslation = {
        from: detectedLanguage,
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
    if(queryText && translation && detectedLanguage !== selectedLanguage) {
      const recentTranslation: ITranslation = {
         from: detectedLanguage,
         text: queryText.trim(),
         to: selectedLanguage,
         translation: translation
      }
      dispatch(addToRecentTranslations(recentTranslation));
    }
  }

  useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
  setQueryText(queryText);
   if(queryText && detectedLanguage && !langsSwitching && inputLanguage === "detect") {
    setInputLanguage(detectedLanguage);
   }
    if(queryText.trim()) {
      dispatch(fetchData(params));
      addTranslationToRecent();
    } else {
      dispatch(clearTranslation());
    }
  }, 300)

   return () => clearTimeout(delayDebounceFn)
  }, [queryText, selectedLanguage, translation, detectedLanguage, inputLanguage])

  return (
    <div className={darkMode ? "wrapper__dark" : "wrapper"}>
      {translation && inputLanguage !== detectedLanguage && inputLanguage !== "detect" ? <div className={darkMode ? "switch-lang-tooltip__dark" : "switch-lang-tooltip"}><h3> &#x2757; Detected language: {detectedLanguage.toUpperCase()} <button className={darkMode ? "switch-btn__dark" : "switch-btn"} onClick={() => setDetectedLanguage()}>Switch</button></h3></div> : null}
     <div className="fields__wrapper">
        <div className="options-field">
          <LanguageSelect selectedLanguage={inputLanguage} setSelectedLanguage={setInputLanguage} darkMode={darkMode} detectLangOption={true} />
          <button className="options-field__switch" onClick={() => switchLanguages()}><Arrows darkMode={darkMode} /></button>
          <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} darkMode={darkMode} detectLangOption={false} />
        </div>
        <div className="translation-fields">
          <div className={darkMode ? "translation-field__dark" : "translation-field"}>
            <TextField queryText={queryText} setQueryText={setQueryText} disabled={false} placeholder=" Text to translate..."  darkMode={darkMode} /> 
          </div>
          <div className="translation-field__output">
            {queryText.trim() && !translation ? <TextFieldSkeleton darkMode={darkMode} /> : <TextField queryText={translation} setQueryText={setQueryText} disabled={true} placeholder=" Translation..."  darkMode={darkMode} />}
          </div>
        </div>
      </div>
        <div className="secondary-options-field">
          <div className="secondary-options">
            <div className="secondary-options__item">
              <div className="secondary-options__item-first">
                <div className="secondary-options__view"><Link className={darkMode ? "fav-link__dark" : "fav-link"} to="favorites">View favorite translations &#9733;</Link></div>
                <div className="secondary-options__view"><Link className={darkMode ? "history-link__dark" : "history-link"} to="history">View history &#x270E;</Link></div>
              </div>
            </div>
            <div className="secondary-options__item">
              <div className="secondary-options__item-second">
                {addedToFavPopUp ? <div className="secondary-options-field__added-to-fav"><AddToFavPopUp /></div> : null}
                {queryText && translation ? <div><button className={darkMode ? "add-to-fav__dark" : "add-to-fav"} onClick={() => addTranslationToFavorites()}>Add to favorites</button></div> : null}
                {copiedPopUp ? <div className="secondary-options-field__copied"><CopiedPopUp /></div> : null }
              <div><button className="secondary-options-field__copy" onClick={() => copyToClipboard()}><Copy darkMode={darkMode} /></button></div>
              </div>
             </div>
          </div>
        </div>
    
    </div>
  );
}

export default Home;
