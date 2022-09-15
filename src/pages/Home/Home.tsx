import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _, { map } from 'underscore';
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearTranslation, fetchData, addToRecentTranslations, addToFavorites, removeFavoriteTranslation } from "../../store/reducers/translations/translationsReducer";
import { IFetchQueries } from "../../../src/interfaces/IFetchQueries";
import TextField from '../../components/TextField/TextField';
import TextFieldSkeleton from "../../components/TextFieldSkeleton/TextFieldSkeleton";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import Arrows from "../../components/Arrows/Arrows";
import Star from "../../components/UI/Star/Star";
import Pen from "../../components/UI/Pen/Pen";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import { ITranslation } from "../../interfaces/ITranslation";
import { IPageProps } from "../../interfaces/IPageProps";
import routes from "../../constants/routes";
import './home.scss';
import 'react-loading-skeleton/dist/skeleton.css';

function Home({darkMode}: IPageProps) {

  const translation = useAppSelector((state) => state.translations.translation);
  const detectedLanguage = useAppSelector((state) => state.translations.detectedLanguage);
  const favoriteTranslations = useAppSelector((state) => state.translations.favoriteTranslations);
  const dispatch = useAppDispatch();

  const [queryText, setQueryText] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ru");
  const [inputLanguage, setInputLanguage] = useState<string>("en");
  const [langsSwitching, setLangsSwitching] = useState<boolean>(false);
  const [addedToFavsModalVisible, setAddedToFavsModalVisible] = useState<boolean>(false);
  const [isTranslationInFavs, setIsTranslationInFavs] = useState<boolean>(false);
  const [tooltipMessage, setTooltipMessage] = useState<string>("");
  const [isErrorModalHidden, setIsErrorModalHidden] = useState<boolean>(true);

  const params: IFetchQueries = {
    text: queryText,
    lang: selectedLanguage
  }

  const favoriteTranslation: ITranslation = {
    from: detectedLanguage,
    text: queryText,
    to: selectedLanguage,
    translation: translation
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
    if(queryText && translation && detectedLanguage !== selectedLanguage && !localStorage.getItem("text")) {
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
     dispatch(addToFavorites(favoriteTranslation));
      setIsTranslationInFavs(true);
      setAddedToFavsModalVisible(true);
      setTooltipMessage("Added to favorites!");
      setTimeout(() =>  setAddedToFavsModalVisible(false), 700);
    }
  }

  const removeTranslationFromFavorites = () => {
    dispatch(removeFavoriteTranslation(favoriteTranslation));
    setIsTranslationInFavs(false);
    setAddedToFavsModalVisible(true);
    setTooltipMessage("Removed from favorites!");
    setTimeout(() =>  setAddedToFavsModalVisible(false), 700);
  }

  const isInFavs = () => {
    if(_.findWhere(favoriteTranslations, favoriteTranslation)) {
      setIsTranslationInFavs(true);
    }
    else {
      setIsTranslationInFavs(false);
    }
  }

  const saveText = () => {
    localStorage.setItem("text", queryText);
  }

  useEffect(() => {
    const textData = localStorage.getItem("text");
   
    if(textData) {
      setQueryText(textData);
    }
   
    isInFavs();
   
    const delayDebounceFn = setTimeout(async () => {
   
    localStorage.clear();
    setQueryText(queryText);
    
    if(queryText && detectedLanguage && !langsSwitching && inputLanguage === "detect") {
      setInputLanguage(detectedLanguage);
    }

    if(queryText.trim()) {
      dispatch(fetchData(params))
        .then(addTranslationToRecent() as never)
        .catch(() => setIsErrorModalHidden(false));
      } else {
        dispatch(clearTranslation());
      }
    }, 350)
  
     return () => clearTimeout(delayDebounceFn)
    }, [queryText, selectedLanguage, detectedLanguage, inputLanguage, translation])

  return (
    <div className={darkMode ? "wrapper__dark" : "wrapper"}>

     {!isErrorModalHidden ? <ErrorModal setIsErrorModalHidden={setIsErrorModalHidden} /> : null }

      {translation && inputLanguage !== detectedLanguage && inputLanguage !== "detect" ? 
      <div className={darkMode ? "switch-lang-tooltip__dark" : "switch-lang-tooltip"}>
        <h3> &#x2757; Detected language: {detectedLanguage.toUpperCase()} 
          <button className={darkMode ? "switch-btn__dark" : "switch-btn"} onClick={() => setDetectedLanguage()}>Switch</button>
        </h3>
      </div> : null}
     <div className={darkMode ? "fields__wrapper__dark" : "fields__wrapper"}>
        <div className={darkMode ? "options-field__dark" : "options-field"}>
          <LanguageSelect selectedLanguage={inputLanguage} setSelectedLanguage={setInputLanguage} darkMode={darkMode} detectLangOption={true} />
          <button className={darkMode ? "options-field__switch__dark" : "options-field__switch"}  onClick={() => switchLanguages()}><Arrows darkMode={darkMode} /></button>
          <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} darkMode={darkMode} detectLangOption={false} />
        </div>
        <div className="translation-fields">
          <div className={darkMode ? "translation-field__dark" : "translation-field"}>
            <TextField queryText={queryText} setQueryText={setQueryText} disabled={false} placeholder=" Text to translate... (max 1000 characters)"
             darkMode={darkMode} inputField={true} addedToFavsModalVisible={addedToFavsModalVisible} addTranslationToFavorites={addTranslationToFavorites} 
             isTranslationInFavs={isTranslationInFavs} removeTranslationFromFavorites={removeTranslationFromFavorites} tooltipMessage={tooltipMessage}
            /> 
          </div>
          <div className="translation-field__output">
            {queryText.trim() && !translation ? <TextFieldSkeleton darkMode={darkMode} /> : 
            <TextField queryText={translation} setQueryText={setQueryText} disabled={true} placeholder=" Translation..." 
              darkMode={darkMode} inputField={false} addedToFavsModalVisible={addedToFavsModalVisible} addTranslationToFavorites={addTranslationToFavorites} 
              isTranslationInFavs={isTranslationInFavs} removeTranslationFromFavorites={removeTranslationFromFavorites} tooltipMessage={tooltipMessage}
            />}
          </div>
        </div>
      </div>
      <div className="secondary-options-field">
        <div className="secondary-options">
          <div className="secondary-options__item">
            <div className="secondary-options__item-first">
              <div className="secondary-options__view">
                <Link className={darkMode ? "fav-link__dark" : "fav-link"} 
                  to={routes.FAVORITES} 
                  onClick={() => saveText()}>View favorites 
                  <span className="star__wrapper"><Star /></span>
                </Link>
              </div>
              <div className="secondary-options__view">
                <Link className={darkMode ? "history-link__dark" : "history-link"} to={routes.HISTORY} onClick={() => saveText()}>View history <span className="pen__wrapper"><Pen /></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
