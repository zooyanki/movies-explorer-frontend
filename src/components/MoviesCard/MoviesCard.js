import React from 'react';

import moviepic from '../../images/movie_pic.jpg'

function MoviesCard(props) {
    return(
        <div className="moviescard">
            <div className="moviescard__header">
                <h3 className="moviescard__name">В погоне за человеком</h3>
                <p className="moviescard__time">23 мин</p>
            </div>
            <img className="moviescard__pic" src={moviepic} alt="Film's frame"/>
            <button className={`moviescard__button moviescard__button${props.buttonModificator}`}>Сохранить</button>
        </div>
    )
}

export default MoviesCard;