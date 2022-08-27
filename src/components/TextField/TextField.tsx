import { ITextFieldProps } from "../../interfaces/ITextFieldProps";
import "./textField.scss";

const TextField = ({queryText, setQueryText}: ITextFieldProps) => {
    return (
        <textarea 
          className="textfield"
          placeholder=" Translate..."
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
        />
    )
}

export default TextField;
