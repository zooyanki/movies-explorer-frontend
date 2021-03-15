import React, { useState, useContext, useEffect } from 'react';

import matrix from '../../images/matrix.jpg';
import { SavedMoviesContext, MoviesContext, CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useLocation } from 'react-router';

function MoviesCard(props) {
    const savedMoviesCards = useContext(SavedMoviesContext);
    const moviesCards = useContext(MoviesContext);
    const currentUser = useContext(CurrentUserContext);

    const location = useLocation();

    const [savedCard, setSavedCard] = useState();

    const isOwn = props.card.owner === currentUser&&currentUser._id;

    useEffect(() => {
        savedMoviesCards.forEach((item) => {
            if (item.owner === currentUser._id){
                if (item.movieId === String(props.card.id)) {
                    setSavedCard(item)
                } 
            }
        })
    })

    const addCard = (e) => {
        e.preventDefault();
        props.onAddLikeCard({
            movieId : String(props.card.id),
            country: props.card.country, 
            director: props.card.director, 
            duration: props.card.duration, 
            year: props.card.year, 
            description: props.card.description, 
            image: `https://api.nomoreparties.co${props.card.image.url}`, 
            trailer: props.card.trailerLink, 
            nameRU: props.card.nameRU, 
            nameEN: props.card.nameEN, 
            thumbnail: `https://api.nomoreparties.co${props.card.image.formats.thumbnail.url}`,
        })
    }

    const deleteCard = () => {
        if (location.pathname === '/saved-movies') {
            props.onDelLikeCard(props.card)}
        if (location.pathname === '/movies') {            
            props.onDelLikeCard(savedCard);
        }
    }

    return(
        <>
            {location.pathname === "/saved-movies"
                    //saved-movies
                ?   isOwn
                    ?    <div className="moviescard">
                            <div className="moviescard__header">
                                <h3 className="moviescard__name">{props.card.nameRU}</h3>
                                <p className="moviescard__time">{`${props.card.duration} мин`}</p>
                            </div>
                            <a className="moviescard__link" href={props.card.trailer}><img className="moviescard__pic" src={props.card.image === null ? matrix : props.card.image} alt="Film's frame"/></a>
                            <button className={`moviescard__button moviescard__button_delete`} onClick={deleteCard}>Сохранить</button>                       
                        </div>
                    :   <></>

                    //movies    
                :   <div className="moviescard">
                        <div className="moviescard__header">
                            <h3 className="moviescard__name">{props.card.nameRU}</h3>
                            <p className="moviescard__time">{`${props.card.duration} мин`}</p>
                        </div>
                        <a className="moviescard__link" href={props.card.trailerLink}><img className="moviescard__pic" src={props.card.image === null ? matrix : `https://api.nomoreparties.co${props.card.image.url}`} alt="Film's frame"/></a>
                        <button className={`moviescard__button ${props.isFavorite ? 'moviescard__button_like' : ''}`} onClick={props.isFavorite ? deleteCard : addCard}>Сохранить</button>                       
                    </div>
            }
        </>
    )
}

export default MoviesCard;