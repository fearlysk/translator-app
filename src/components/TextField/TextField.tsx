import { ITextFieldProps } from "../../interfaces/ITextFieldProps";
import "./textField.scss";

const TextField = ({queryText, setQueryText, disabled, placeholder, darkMode}: ITextFieldProps) => {
    return (
      <div className="textfield__wrapper">
        <textarea 
          className={darkMode ? "textfield__dark" : "textfield" }
          placeholder={placeholder}
          value={queryText}
          disabled={disabled}
          onChange={(e) => setQueryText(e.target.value)}
        />
      </div>
    )
}

export default TextField;
