import Skeleton from "react-loading-skeleton";
import { IDarkMode } from "../../interfaces/IDarkMode";
import "./TextFieldSkeleton.scss";

const TextFieldSkeleton = ({darkMode}: IDarkMode) => {
    return (
      <div className={darkMode ? "textfield-skeleton__dark" : "textfield-skeleton"}>  
        <Skeleton count={10} height={37}/>
      </div>
    )
}

export default TextFieldSkeleton;
