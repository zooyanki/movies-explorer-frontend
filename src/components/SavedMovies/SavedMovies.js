import React, {useState} from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {

//--------------------Вкл/выкл короткометражек--------------//
    const [shortFilm, setShortFilm] = useState(false);

    const handleShortFIlmSubmit = (e) => {
        e.preventDefault();
        setShortFilm((prevState) => ({
            shortFilm: !prevState.shortFilm
        }))
    }

    return (
        <>
            <SearchForm 
                onSearchMovie={props.onSearchMovie} 
                onSearchShortMovie={props.onSearchShortMovie} 
                onShortFilmSubmit={handleShortFIlmSubmit}
                shortFilm={shortFilm}
            />
            <MoviesCardList 
                buttonModificator={props.buttonModificator} 
                cards={props.cards.filter((card) => {
                    if (shortFilm.shortFilm) {
                        if (card.duration < 40) {
                            if (props.foundMovie === '') {
                                return card
                            } else {
                                return card.nameRU.indexOf(props.foundMovie) > -1
                            }    
                        }
                    } else {
                        if (props.foundMovie === '') {
                            return card
                        } else {
                            return card.nameRU.indexOf(props.foundMovie) > -1
                        }                        
                    }
                })} 
                onDelLikeCard={props.onDelLikeCard}
            />
        </>
    )
}

export default SavedMovies;