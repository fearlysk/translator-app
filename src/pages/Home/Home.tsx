import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearTranslation, fetchData, addToFavorites } from "../../store/reducers/translations/translationsReducer";
import { IFetchQueries } from "../../../src/interfaces/IFetchQueries";
import TextField from '../../components/TextField/TextField';
import TextFieldSkeleton from "../../components/TextFieldSkeleton/TextFieldSkeleton";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";
import Arrows from "../../components/Arrows/Arrows";
import Copy from "../../components/Copy/Copy";
import CopiedPopUp from "../../components/Copy/CopiedPopUp/CopiedPopUp";
import AddToFavPopUp from "../../components/AddToFavPopUp/AddToFavPopUp";
import './home.scss';
import 'react-loading-skeleton/dist/skeleton.css';

function Home() {

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
        text: queryText,
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
    if(queryText !== "") {
        dispatch(fetchData(params));
    } else {
      dispatch(clearTranslation());
    }
   
  }, 500)
  
   return () => clearTimeout(delayDebounceFn)
  }, [queryText, selectedLanguage])

  return (
    <div className="wrapper">
       
      <div className="fields__wrapper">
  
        <div className="options-field">
          <LanguageSelect selectedLanguage={inputLanguage} setSelectedLanguage={setInputLanguage} />
          <button className="options-field__fav" onClick={() => switchLanguages()}><Arrows /></button>
          <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        </div>

        <div className="translation-fields">
          <div className="translation-field">
            <TextField queryText={queryText} setQueryText={setQueryText} disabled={false} placeholder=" Text to translate..." /> 
          </div>
          <div className="translation-field__output">
            {queryText && !translation ? <TextFieldSkeleton /> : <TextField queryText={translation} setQueryText={setQueryText} disabled={true} placeholder=" Translation..."/>}
          </div>
        </div>

      </div>
        
        <div className="secondary-options-field">
          
          <div>
             <Link className="fav-link" to="favorites">View favorite translations &#9733;</Link>
             {translation && queryText ? <span className="detected-lang">Language: {detectedLanguage}</span> : null}
          </div>
          
          {addedToFavPopUp ? <div className="secondary-options-field__added-to-fav"><AddToFavPopUp /></div> : null}
          {queryText && translation ? <div><button className="add-to-fav" onClick={() => addTranslationToFavorites()}>Add to favorites</button></div> : null}
          
          <div className="secondary-options-field__copy--wrapper">
            {copiedPopUp ? <div className="secondary-options-field__copied"><CopiedPopUp /></div> : null }
            <div><button className="secondary-options-field__copy" onClick={() => copyToClipboard()}><Copy /></button></div>
          </div>
        
        </div>
        
          {/[a-zA-Z]/.test(queryText) && inputLanguage === "ru" ? <div className="switch-lang-tooltip"><h3>Your keyboard layout differs from selected language: <button className="switch-btn" onClick={() => switchLanguages()}>Switch</button></h3></div> : null}
          {/[а-яА-Я]/.test(queryText) && inputLanguage !== "ru" ? <div className="switch-lang-tooltip"><h3>Your keyboard layout differs from selected language: <button className="switch-btn" onClick={() => switchLanguages()}>Switch</button></h3></div> : null}
      
    </div>
  );
}

export default Home;
