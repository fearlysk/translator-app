import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../src/store/hooks';
import { clearFavoriteTranslations, removeFavoriteTranslation } from "../../store/reducers/translations/translationsReducer";
import './favorites.scss';

const Favorites = () => {

    const favorites = useAppSelector((state) => state.translations.favoriteTranslations);
    const dispatch = useAppDispatch()

    const clearFavorites = () => {
        dispatch(clearFavoriteTranslations());
    }
    
    const removeTranslation = (id: number) => {
        dispatch(removeFavoriteTranslation(id))
    }

    return (
        <div>
          {favorites.length ? <h1 className="fav-headline">Favorite Translations</h1> : null}
          {!favorites.length ? <h2 className="no-favs">No favorite translations</h2> : null}
          <div className="fav-wrapper">
              {favorites.map((item, index) => 
              <div>
                <div className="fav-translation">
                    <h1><span className="fav-lang">{item.from}</span> &rarr; <span className="fav-lang">{item.to}</span></h1>
                  <div className="fav-translation__item">
                    <h3><span className="fav-lang">{item.from}</span>: {item.text}</h3>
                  </div>
                  <div>
                    <h3><span className="fav-lang">{item.to}</span>: {item.translation}</h3>
                  </div>
                  <button className="remove-fav" onClick={() => removeTranslation(index)}>Remove &#x2715;</button>
                </div>
              </div>
              )}
          </div>
          <div className="fav-options">
            {favorites.length ? <div className="clear-favs"><button className="clear-favs-btn" onClick={() => clearFavorites()}>Clear Favorites</button></div> : null}
          </div>
          <div className="fav-goBack__wrapper"><div><Link className="fav-goBack" to="/">&larr; Go back</Link></div></div>
        </div>
    )
}

export default Favorites;
