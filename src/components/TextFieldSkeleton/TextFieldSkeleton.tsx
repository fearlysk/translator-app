import Skeleton from "react-loading-skeleton";
import "./TextFieldSkeleton.scss";

const TextFieldSkeleton = () => {
    return (
      <div className="textfield-skeleton">  
        <Skeleton count={1} height={30}/>
      </div>
    )
}

export default TextFieldSkeleton;
