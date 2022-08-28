import { ILanguageSelectProps } from "../../interfaces/ILanguageSelectProps";
import "./languageSelect.scss";

const LanguageSelect = ({selectedLanguage, setSelectedLanguage}: ILanguageSelectProps) => {
    return (
        <div>
            <select   
              className="select_menu"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option value="ru">Russian</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="es">Espanol</option>
                <option value="it">Italian</option>
            </select>
        </div>
    )
}

export default LanguageSelect;