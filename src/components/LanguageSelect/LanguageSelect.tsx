import { ILanguageSelectProps } from "../../interfaces/ILanguageSelectProps";
import "./languageSelect.scss";

const LanguageSelect = ({selectedLanguage, setSelectedLanguage}: ILanguageSelectProps) => {
    return (
        <div className="select-menu__wrapper">
            <select   
              className="select-menu"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}>
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