import { useAppSelector } from '../../../src/store/hooks';
import { Link } from "react-router-dom";
import './favorites.scss';

const Favorites = () => {

    const favorites = useAppSelector((state) => state.translations.favoriteTranslations);

    return (
        <div>
            <h1>Favorites</h1>
            <Link to="/">Go back</Link>
            <div>
                {favorites.map((item) => 
                  <p key={favorites.length}>{item.text} : {item.translation}</p>
                )}
            </div>
        </div>
    )
}

export default Favorites;
