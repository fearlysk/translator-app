import Skeleton from "react-loading-skeleton";
import { IDarkMode } from "../../interfaces/IDarkMode";
import "./TextFieldSkeleton.scss";

const TextFieldSkeleton = ({darkMode}: IDarkMode) => {
    return (
      <div className={darkMode ? "textfield-skeleton__dark" : "textfield-skeleton"}>  
        <Skeleton count={8} height={34}/>
      </div>
    )
}

export default TextFieldSkeleton;
