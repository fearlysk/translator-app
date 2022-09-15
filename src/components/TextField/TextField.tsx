import { useState } from "react";
import Tippy from '@tippyjs/react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Star from "../UI/Star/Star";
import Copy from "../Copy/CopyIcon/Copy";
import { ITextFieldProps } from "../../interfaces/ITextFieldProps";
import "./textField.scss";
import 'tippy.js/dist/tippy.css'; 
import { clearTranslation } from "../../store/reducers/translations/translationsReducer";

const TextField = ({ queryText, setQueryText, disabled, placeholder, darkMode, inputField, addedToFavsModalVisible, 
  addTranslationToFavorites, isTranslationInFavs, removeTranslationFromFavorites, tooltipMessage}: ITextFieldProps) => {

  const translation = useAppSelector((state) => state.translations.translation);
  const dispatch = useAppDispatch();

  const [copiedModalVisible, setCopiedModalVisible] = useState(false);

  const showCopiedModal = () => {
    setCopiedModalVisible(true);
    setTimeout(() => setCopiedModalVisible(false), 700);
  };

  const maxLength = 1000;

  const clearInput = () => {
    setQueryText("");
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translation);
    showCopiedModal();
  }

  const onChangeHandler = (value: string) => {
    setQueryText(value);
    dispatch(clearTranslation());
  }

    return (
      <div>
        <div className="textfield__wrapper">
          <textarea 
            className={darkMode ? "textfield__dark" : "textfield" }
            placeholder={placeholder}
            value={queryText}
            disabled={disabled}
            onChange={(e) => onChangeHandler(e.target.value)}
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
            {queryText && translation ? 
              <div className="textfield__options-btn">
                <Tippy content={<span>{tooltipMessage}</span>} visible={addedToFavsModalVisible}>
                  <button className={darkMode ? "action-btn__dark" : "action-btn"} onClick={isTranslationInFavs ? removeTranslationFromFavorites : addTranslationToFavorites}>
                    <Star isTranslationInFavs={isTranslationInFavs} />
                  </button>
                </Tippy>
              </div> : null }
            <div className="textfield__options-btn">
              <Tippy content={<span>Copied!</span>} visible={copiedModalVisible}>
                <button className={darkMode ? "action-btn__dark" : "action-btn"} onClick={() => copyToClipboard()}>
                  <Copy />
                </button>
              </Tippy>
              </div>
          </div>
        : null}
      </div>
    )
}

export default TextField;
