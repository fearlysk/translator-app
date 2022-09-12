import { Link } from "react-router-dom";
import ArrowLeft from "../../components/UI/ArrowLeft/ArrowLeft";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearRecentTranslations, removeRecentTranslation } from "../../store/reducers/translations/translationsReducer";
import { IPageProps } from "../../interfaces/IPageProps";
import routes from "../../constants/routes";
import './history.scss';

const History = ({darkMode}: IPageProps) => {

    const history = useAppSelector((state) => state.translations.recentTranslations);

    const dispatch = useAppDispatch()

    const clearHistory = () => {
        dispatch(clearRecentTranslations());
    }
    
    const removeTranslation = (id: number) => {
        dispatch(removeRecentTranslation(id))
    }

    return (
      <div className={darkMode ? "history-page-wrapper__dark" : "history-page-wrapper"}>
        <div className={darkMode ? "fields-history__wrapper__dark" : "fields-history__wrapper" }>
        {history.length ? <div className={darkMode ? "history-headline__wrapper__dark" : "history-headline__wrapper" }><div><Link className="history-goBack" to={routes.HOME}><ArrowLeft /></Link></div><div className="history-headline"><h1>History of translations</h1></div></div> : null}
        {!history.length ? <div className={darkMode ? "history-headline__wrapper__dark" : "history-headline__wrapper" }><div><Link className="history-goBack" to={routes.HOME}><ArrowLeft /></Link></div><div className="history-headline"><h1>No translations</h1></div></div> : null}
        <div className="history-wrapper">
            {history.map((item, index) => 
            <div key={index}>
              <div className="history-translation">
                <div className="history-translation__header">
                  <div><h1><span className={darkMode ? "history-lang__dark" : "history-lang"}>&#9997; {item.from}</span> &rarr; <span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.to}</span></h1></div>
                  <div><button className="remove-history" onClick={() => removeTranslation(index)}>&#10006;</button></div>
                </div>
                <div className="history-translation__item">
                  <h2 className="history-translation__item-lang"><span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.from}</span>: {item.text}</h2>
                </div>
                <div>
                  <h2 className="history-translation__item-lang"><span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.to}</span>: {item.translation}</h2>
                </div>
              </div>
            </div>
            )}
        </div>
        <div className="history-options">
          {history.length ? <div className="clear-history"><button className="clear-history-btn" onClick={() => clearHistory()}>Clear History</button></div> : null}
        </div>
        </div>
        <div className="bottom-space"></div>
      </div>
    )
} 

export default History;
