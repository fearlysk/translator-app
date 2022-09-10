import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearTranslation, fetchData, addToRecentTranslations, addToFavorites } from "../../store/reducers/translations/translationsReducer";
import { IFetchQueries } from "../../../src/interfaces/IFetchQueries";
import TextField from '../../components/TextField/TextField';
import TextFieldSkeleton from "../../components/TextFieldSkeleton/TextFieldSkeleton";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import Arrows from "../../components/Arrows/Arrows";
import CopiedPopUp from "../../components/Copy/CopiedPopUp/CopiedPopUp";
import AddToFavPopUp from "../../components/AddToFavPopUp/AddToFavPopUp";
import Star from "../../components/UI/Star/Star";
import Pen from "../../components/UI/Pen/Pen";
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
  }, 350)

   return () => clearTimeout(delayDebounceFn)
  }, [queryText, selectedLanguage, translation, detectedLanguage, inputLanguage])

  return (
    <div className={darkMode ? "wrapper__dark" : "wrapper"}>
      {translation && inputLanguage !== detectedLanguage && inputLanguage !== "detect" ? <div className={darkMode ? "switch-lang-tooltip__dark" : "switch-lang-tooltip"}><h3> &#x2757; Detected language: {detectedLanguage.toUpperCase()} <button className={darkMode ? "switch-btn__dark" : "switch-btn"} onClick={() => setDetectedLanguage()}>Switch</button></h3></div> : null}
     <div className={darkMode ? "fields__wrapper__dark" : "fields__wrapper"}>
        <div className={darkMode ? "options-field__dark" : "options-field"}>
          <LanguageSelect selectedLanguage={inputLanguage} setSelectedLanguage={setInputLanguage} darkMode={darkMode} detectLangOption={true} />
          <button className={darkMode ? "options-field__switch__dark" : "options-field__switch"}  onClick={() => switchLanguages()}><Arrows darkMode={darkMode} /></button>
          <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} darkMode={darkMode} detectLangOption={false} />
        </div>
        <div className="translation-fields">
          <div className={darkMode ? "translation-field__dark" : "translation-field"}>
            <TextField queryText={queryText} setQueryText={setQueryText} disabled={false} placeholder=" Text to translate... (max 1000 characters)" darkMode={darkMode} inputField={true} setCopiedPopUp={setCopiedPopUp} setAddedToFavPopUp={setAddedToFavPopUp} selectedLanguage={selectedLanguage} addTranslationToFavorites={addTranslationToFavorites} /> 
          </div>
          <div className="translation-field__output">
            {queryText.trim() && !translation ? <TextFieldSkeleton darkMode={darkMode} /> : <TextField queryText={translation} setQueryText={setQueryText} disabled={true} placeholder=" Translation..."  darkMode={darkMode} inputField={false} setCopiedPopUp={setCopiedPopUp} setAddedToFavPopUp={setAddedToFavPopUp} selectedLanguage={selectedLanguage} addTranslationToFavorites={addTranslationToFavorites} />}
          </div>
        </div>
      </div>
        <div className="secondary-options-field">
          <div className="secondary-options">
            <div className="secondary-options__item">
              <div className="secondary-options__item-first">
                <div className="secondary-options__view"><Link className={darkMode ? "fav-link__dark" : "fav-link"} to="favorites">View favorites <span className="star__wrapper"><Star /></span></Link></div>
                <div className="secondary-options__view"><Link className={darkMode ? "history-link__dark" : "history-link"} to="history">View history <span className="pen__wrapper"><Pen /></span></Link></div>
              </div>
            </div>
            <div className="secondary-options__item">
              {addedToFavPopUp ? <div className="secondary-options-field__added-to-fav"><AddToFavPopUp /></div> : null}
              {copiedPopUp ? <div className="secondary-options-field__copied"><CopiedPopUp /></div> : null }
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;
