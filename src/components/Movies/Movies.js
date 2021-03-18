import React, { useContext, useState, useEffect } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Movies(props) {
    const currentUser = useContext(CurrentUserContext);
    
    const [addCards, setAddCards] = useState(0);
    const [baseCards, setBaseCards] = useState();
    const [countCards, setCountCards] = useState()
    const [shortFilm, setShortFilm] = useState(false);
    
    const handleAddCards = () => {
        setAddCards((count) => count + countCards);
    }

    useEffect(()=>{
        if (window.frames.screen.width >= 1280) {
            setBaseCards(12);
            setCountCards(3);
        } else if (window.frames.screen.width < 1279 && window.frames.screen.width >= 768) {
            setBaseCards(8);
            setCountCards(2);
        } else if (window.frames.screen.width < 767) {
            setBaseCards(5);
            setCountCards(1);
        }        
    })

//--------------------Вкл/выкл короткометражек--------------//
    
    
    const handleShortFIlmSubmit = (e) => {
        e.preventDefault();
        setShortFilm((prevState) => ({
            shortFilm: !prevState.shortFilm
        }))
    }
//////////////////////////////////////////////////////////////
    if (!currentUser) {
        return <div></div>
    } 

    const cards = props.cards.filter((card) => {
        if (shortFilm.shortFilm) {
            if (card.duration < 40) {
                if (props.foundMovie === '') {
                    return card;
                }
                else {
                    return card.nameRU.indexOf(props.foundMovie) > -1;
                }
            }
        }
        else {
            if (props.foundMovie === '') {
                return card;
            }
            else {
                return card.nameRU.indexOf(props.foundMovie) > -1;
            }
        }
    }).slice(0, baseCards + addCards);
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
                cards={cards} 
                onAddLikeCard={props.onAddLikeCard} 
                onDelLikeCard={props.onDelLikeCard}
                onFoundMovie={props.foundMovie}
            />
            <div className="block-width_768" >
                <button className={`movies__button ${((baseCards+addCards) > cards.length) ? 'movies__button_off' : ''}`} type="button" onClick={handleAddCards}>Ещё</button>
            </div>
            
        </>
    )
}

export default Movies;