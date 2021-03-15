import React, { useState, useEffect, useRef } from 'react';

import searchLogo from '../../images/search_icon.svg'

function SearchForm(props) {

    const searchInputRef = useRef('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        props.onSearchMovie(searchInputRef.current.value)
    }

    return (
        <form className="searchform block-width_768" onSubmit={handleSearchSubmit}>
            <div className="searchform__form">
                <img className="searchform__logo" src={searchLogo} alt="magnifying glass"/>
                <input className="searchform__input" ref={searchInputRef} type="text" name="search" placeholder="Найти"/>
                <button className="searchform__button" type="submit">Найти</button>
                <div className="searchform__shortblock">
                    <button className={`searchform__toggle ${props.shortFilm.shortFilm ? 'searchform__toggle_on' : ''}`}  type="button" onClick={props.onShortFilmSubmit} alt="toggle button" />
                    <p className="searchform__toggle-text">Короткометражки</p>
                </div>
            </div>
            <div className="searchform__shortblock_320">
                <button className={`searchform__toggle ${props.shortFilm.shortFilm ? 'searchform__toggle_on' : ''}`} type="button" onClick={props.onShortFilmSubmit} alt="toggle button" />
                <p className="searchform__toggle-text">Короткометражки</p>
            </div>
        </form>
    )
}
export default SearchForm;