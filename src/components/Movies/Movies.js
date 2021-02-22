import React from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
    return (
        <>            
            <MoviesCardList buttonModificator={props.buttonModificator}/>
            <div className="block-width">
                <button className="movies__button">Ещё</button>
            </div>
        </>
    )
}

export default Movies;