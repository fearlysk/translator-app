import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addToFavorites } from "../../store/reducers/translations/translationsReducer";
import Star from "../UI/Star/Star";
import Copy from "../Copy/CopyIcon/Copy";
import { ITextFieldProps } from "../../interfaces/ITextFieldProps";
import { ITranslation } from "../../interfaces/ITranslation";
import "./textField.scss";

const TextField = ({queryText, setQueryText, disabled, placeholder, darkMode, inputField, setCopiedPopUp, setAddedToFavPopUp, selectedLanguage}: ITextFieldProps) => {

  const translation = useAppSelector((state) => state.translations.translation);
  const detectedLanguage = useAppSelector((state) => state.translations.detectedLanguage);
  const dispatch = useAppDispatch();
  
  const maxLength = 1000;

  const clearInput = () => {
    setQueryText("");
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

    return (
      <div>
        <div className="textfield__wrapper">
          <textarea 
            className={darkMode ? "textfield__dark" : "textfield" }
            placeholder={placeholder}
            value={queryText}
            disabled={disabled}
            onChange={(e) => setQueryText(e.target.value)}
            maxLength={maxLength}
          />
          {inputField ?
            <div className="textfield__clear">
              {queryText ? <button className={darkMode ? "textfield__clear-btn" : "textfield__clear-btn__dark"} onClick={() => clearInput()}>x</button> : null}
            </div>
          : null}  
        </div>
        
        {inputField ? <div className={darkMode ? "textfield__count__dark" : "textfield__count"}><h3>{queryText.length}/{maxLength}</h3></div> : null}
        
        {!inputField ? 
          <div className="textfield__options">
            {queryText && translation ?  <div className="textfield__options-btn"><button className={darkMode ? "action-btn__dark" : "action-btn"} onClick={() => addTranslationToFavorites()}><Star /></button></div> : null }
            <div className="textfield__options-btn"><button className={darkMode ? "action-btn__dark" : "action-btn"} onClick={() => copyToClipboard()}><Copy /></button></div>
          </div>
        : null}
      </div>
    )
}

export default TextField;
