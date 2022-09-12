import { Link } from "react-router-dom";
import ArrowLeft from "../../components/UI/ArrowLeft/ArrowLeft";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearFavoriteTranslations, removeFavoriteTranslation } from "../../store/reducers/translations/translationsReducer";
import { IPageProps } from "../../interfaces/IPageProps";
import routes from "../../constants/routes";
import './favorites.scss';

const Favorites = ({darkMode}: IPageProps) => {

    const favorites = useAppSelector((state) => state.translations.favoriteTranslations);

    const dispatch = useAppDispatch()

    const clearFavorites = () => {
        dispatch(clearFavoriteTranslations());
    }
    
    const removeTranslation = (id: number) => {
        dispatch(removeFavoriteTranslation(id))
    }

    return (
      <div className={darkMode ? "favorites-page-wrapper__dark" : "favorites-page-wrapper"}>
        <div className={darkMode ? "fields-favorites__wrapper__dark" : "fields-favorites__wrapper" }>
        {favorites.length ? <div className={darkMode ? "fav-headline__wrapper__dark" : "fav-headline__wrapper" }><div><Link className="fav-goBack" to={routes.HOME}><ArrowLeft /></Link></div><div className="fav-headline"><h1>Favorite Translations</h1></div></div> : null}
        {!favorites.length ? <div className={darkMode ? "fav-headline__wrapper__dark" : "fav-headline__wrapper" }><div><Link className="fav-goBack" to={routes.HOME}><ArrowLeft /></Link></div><div className="fav-headline"><h1>No favorite translations</h1></div></div> : null}
        <div className="fav-wrapper">
            {favorites.map((item, index) => 
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
          {favorites.length ? <div className="clear-favs"><button className={darkMode ? "clear-favs-btn__dark" : "clear-favs-btn" } onClick={() => clearFavorites()}>Clear Favorites</button></div> : null}
        </div>
      </div>
      <div className="bottom-space"></div>
    </div>
    )
}

export default Favorites;
