import { ITextFieldProps } from "../../interfaces/ITextFieldProps";
import "./textField.scss";

const TextField = ({queryText, setQueryText, disabled, placeholder}: ITextFieldProps) => {
    return (
      <div className="textfield__wrapper">
        <textarea 
          className="textfield"
          placeholder={placeholder}
          value={queryText}
          disabled={disabled}
          onChange={(e) => setQueryText(e.target.value)}
        />
      </div>
    )
}

export default TextField;
