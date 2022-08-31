import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearRecentTranslations, removeRecentTranslation } from "../../store/reducers/translations/translationsReducer";
import { IPageProps } from "../../interfaces/IPageProps";
import './history.scss';

const History = ({darkMode}: IPageProps) => {

    const history = useAppSelector((state) => state.translations.recentTranslations)
    const dispatch = useAppDispatch()

    const clearHistory = () => {
        dispatch(clearRecentTranslations());
    }
    
    const removeTranslation = (id: number) => {
        dispatch(removeRecentTranslation(id))
    }

    return (
      <div className={darkMode ? "history-page-wrapper__dark" : "history-page-wrapper"}>
        <div className="fields-history__wrapper">
        <div className="history-goBack__wrapper"><div><Link className="history-goBack" to="/">&larr; Go back</Link></div></div>
        {history.length ? <h1 className="history-headline">History of translations</h1> : null}
        {!history.length ? <h2 className="no-history">No translations</h2> : null}
        <div className="history-wrapper">
            {history.map((item, index) => 
            <div>
              <div className="history-translation">
                  <h1><span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.from}</span> &rarr; <span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.to}</span></h1>
                <div className="history-translation__item">
                  <h3><span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.from}</span>: {item.text}</h3>
                </div>
                <div>
                  <h3><span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.to}</span>: {item.translation}</h3>
                </div>
                <button className="remove-history" onClick={() => removeTranslation(index)}>Remove &#x2715;</button>
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
