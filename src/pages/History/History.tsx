import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearRecentTranslations, removeRecentTranslation } from "../../store/reducers/translations/translationsReducer";
import { IPageProps } from "../../interfaces/IPageProps";
import { ITranslation } from "../../interfaces/ITranslation";
import './history.scss';

const History = ({darkMode}: IPageProps) => {

    const history = useAppSelector((state) => state.translations.recentTranslations);
    
    const uniqueHistoryItems = history.reduce((unique: Array<ITranslation>, o) => {
      if(!unique.some(obj => obj.text === o.text && obj.translation === o.translation)) {
        unique.push(o);
      }
      return unique;
    }, []);

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
            {uniqueHistoryItems.map((item, index) => 
            <div key={index}>
              <div className="history-translation">
                <div className="history-translation__header">
                  <div><h1><span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.from}</span> &rarr; <span className={darkMode ? "history-lang__dark" : "history-lang"}>{item.to}</span></h1></div>
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
