import { ILanguageSelectProps } from "../../interfaces/ILanguageSelectProps";
import "./languageSelect.scss";

const LanguageSelect = ({selectedLanguage, setSelectedLanguage, darkMode, detectLangOption}: ILanguageSelectProps) => {
    
  return (
    <div className="select-menu__wrapper">
        <select   
          className={darkMode ? "select-menu__dark" : "select-menu"}
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}>
            {detectLangOption ? <option className="select-menu__option" value="define">Define language</option> : null}
            <option className="select-menu__option" value="ru">Russian</option>
            <option className="select-menu__option" value="en">English</option>
            <option className="select-menu__option" value="de">Deutsch</option>
            <option className="select-menu__option" value="es">Espanol</option>
            <option className="select-menu__option" value="it">Italian</option> 
        </select>
    </div>
  )
}

export default LanguageSelect;