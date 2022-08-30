import Skeleton from "react-loading-skeleton";
import "./TextFieldSkeleton.scss";

const TextFieldSkeleton = () => {
    return (
      <div className="textfield-skeleton">  
        <Skeleton count={8} height={34}/>
      </div>
    )
}

export default TextFieldSkeleton;
