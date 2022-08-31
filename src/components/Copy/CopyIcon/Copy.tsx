import { IDarkMode } from "../../../interfaces/IDarkMode";
import "./copy.scss";

const Copy = ({darkMode}: IDarkMode) => {
    return (
      <svg viewBox="0 0 24 24" 
        className={darkMode ? "copy-dark" : "copy-light"}
        width="50"
        height="30"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        aria-hidden="true">
          <path d="M8.75 16.25H6.875C5.83947 16.25 5 15.1867 5 13.875V4.375C5 3.06332 5.83947 2 6.875 2H14.375C15.4105 2 16.25 3.06332 16.25 4.375V6.75M10.625 21H18.125C19.1605 21 20 19.9367 20 18.625V9.125C20 7.81332 19.1605 6.75 18.125 6.75H10.625C9.58947 6.75 8.75 7.81332 8.75 9.125V18.625C8.75 19.9367 9.58947 21 10.625 21Z" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    )
}

export default Copy;
