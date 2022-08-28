import { ITextFieldProps } from "../../interfaces/ITextFieldProps";
import "./textField.scss";

const TextField = ({queryText, setQueryText, disabled}: ITextFieldProps) => {
    return (
        <textarea 
          className="textfield"
          placeholder=" Translate..."
          value={queryText}
          disabled={disabled}
          onChange={(e) => setQueryText(e.target.value)}
        />
    )
}

export default TextField;
