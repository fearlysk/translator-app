import { ILanguageSelectProps } from "../../interfaces/ILanguageSelectProps";
import "./languageSelect.scss";

const LanguageSelect = ({selectedLanguage, setSelectedLanguage, darkMode, detectLangOption}: ILanguageSelectProps) => {
    
  return (
    <div className="select-menu__wrapper">
        <select   
          className={darkMode ? "select-menu__dark" : "select-menu"}
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}>
            {detectLangOption ? <option className="select-menu__option" value="detect">DETECT LANGUAGE</option> : null}
            <option className={darkMode ? "select-menu__option__dark" : "select-menu__option"} value="ru">RUSSIAN</option>
            <option className={darkMode ? "select-menu__option__dark" : "select-menu__option"} value="en">ENGLISH</option>
            <option className={darkMode ? "select-menu__option__dark" : "select-menu__option"} value="de">DEUTSCH</option>
            <option className={darkMode ? "select-menu__option__dark" : "select-menu__option"} value="es">ESPANOL</option>
            <option className={darkMode ? "select-menu__option__dark" : "select-menu__option"} value="it">ITALIAN</option> 
        </select>
    </div>
  )
}

export default LanguageSelect;