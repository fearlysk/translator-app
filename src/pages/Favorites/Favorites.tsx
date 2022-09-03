import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearFavoriteTranslations, removeFavoriteTranslation } from "../../store/reducers/translations/translationsReducer";
import { IPageProps } from "../../interfaces/IPageProps";
import { ITranslation } from "../../interfaces/ITranslation";
import './favorites.scss';

const Favorites = ({darkMode}: IPageProps) => {

    const favorites = useAppSelector((state) => state.translations.favoriteTranslations);

    const uniqueFavorites = favorites.reduce((unique: Array<ITranslation>, o) => {
      if(!unique.some(obj => obj.text === o.text && obj.translation === o.translation)) {
        unique.push(o);
      }
      return unique;
    }, []);

    const dispatch = useAppDispatch()

    const clearFavorites = () => {
        dispatch(clearFavoriteTranslations());
    }
    
    const removeTranslation = (id: number) => {
        dispatch(removeFavoriteTranslation(id))
    }

    return (
        <div className={darkMode ? "favorites-page-wrapper__dark" : "favorites-page-wrapper"}>
          <div className="fields-favorites__wrapper">
          <div className="fav-goBack__wrapper"><div><Link className="fav-goBack" to="/">&larr; Go back</Link></div></div>
          {favorites.length ? <h1 className="fav-headline">Favorite Translations</h1> : null}
          {!favorites.length ? <h2 className="no-favs">No favorite translations</h2> : null}
          <div className="fav-wrapper">
              {uniqueFavorites.map((item, index) => 
              <div key={index}>
                <div className="fav-translation">
                  <div className="fav-translation__header">
                    <div><h1><span className={darkMode ? "fav-lang__dark" : "fav-lang"}>&#x2B50; {item.from}</span> &rarr; <span className={darkMode ? "fav-lang__dark" : "fav-lang"}>{item.to}</span></h1></div>
                    <div><button className="remove-fav" onClick={() => removeTranslation(index)}>&#10006;</button></div>
                  </div>
                  <div className="fav-translation__item">
                    <h2 className="fav-translation__item-lang"><span className={darkMode ? "fav-lang__dark" : "fav-lang"}>{item.from}</span>: {item.text}</h2>
                  </div>
                  <div>
                    <h2 className="fav-translation__item-lang"><span className={darkMode ? "fav-lang__dark" : "fav-lang"}>{item.to}</span>: {item.translation}</h2>
                  </div>
                </div>
              </div>
              )}
          </div>
          <div className="fav-options">
            {favorites.length ? <div className="clear-favs"><button className="clear-favs-btn" onClick={() => clearFavorites()}>Clear Favorites</button></div> : null}
          </div>
        </div>
        <div className="bottom-space"></div>
      </div>
    )
}

export default Favorites;
