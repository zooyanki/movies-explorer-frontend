import React, {useContext, useEffect, useState} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {SavedMoviesContext, CurrentUserContext} from '../../contexts/CurrentUserContext';

function MoviesCardList(props) {
    const savedMoviesCards = useContext(SavedMoviesContext);
    const currentUser = useContext(CurrentUserContext);

    const userSavedCards = savedMoviesCards.filter((item) => {
        if (currentUser&&currentUser._id === item.owner) {
            return item
        }
    })

    return (
        <div className="block-width_768">
            <div className="moviescardlist">
                {props.cards.map((card) => {
                        
                        let isFavorite = savedMoviesCards.findIndex((item) => {
                            if (currentUser&&currentUser._id === item.owner) {
                                return String(card.id) === item.movieId
                            }
                        }) > -1;

                    return <MoviesCard 
                        buttonModificator={props.buttonModificator}
                        name={card.nameRU} duration={card.duration} 
                        card={card} 
                        onAddLikeCard={props.onAddLikeCard} 
                        onDelLikeCard={props.onDelLikeCard} 
                        id={props.id} 
                        isFavorite={isFavorite}
                    />
                })}
                {props.cards.length === 0 && <div className="moviecardlist__nomovies">Упс... А фильма такого нет</div> 
                ||
                userSavedCards.length === 0 && <div className="moviecardlist__nomovies">У вас нет сохраненных фильмов</div>}
            </div>
        </div>
    )
}

export default MoviesCardList;