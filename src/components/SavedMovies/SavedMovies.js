import React from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
    return (
        <>
            <MoviesCardList buttonModificator={props.buttonModificator}/>
        </>
    )
}

export default SavedMovies;