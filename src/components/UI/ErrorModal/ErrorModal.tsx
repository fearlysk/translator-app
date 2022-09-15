import { IErrorModalProps } from "../../../interfaces/IErrorModalProps";
import "./errorModal.scss";

const ErrorModal = ({setIsErrorModalHidden}: IErrorModalProps) => {

    return (
      <div className="error-modal">
        <div className="error-modal__content">
          <span className="error-modal__close" onClick={() => setIsErrorModalHidden(true)}>&times;</span>
          <p>Something went wrong, try again later...</p>
        </div>
      </div>
    )
}

export default ErrorModal;
