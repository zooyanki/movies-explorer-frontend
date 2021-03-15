import React from 'react';

import searchLogo from '../../images/search_icon.svg'
import searchToggle from '../../images/search_smalltumb.svg';

function SearchForm() {
    return (
        <form className="searchform block-width_768">
            <div className="searchform__form">
                <img className="searchform__logo" src={searchLogo} alt="magnifying glass"/>
                <input className="searchform__input" type="text" value="Фильм"/>
                <button className="searchform__button" type="button">Найти</button>
                <div className="searchform__shortblock">
                    <img className="searchform__toggle" src={searchToggle} alt="toggle button" />
                    <p className="searchform__toggle-text">Короткометражки</p>
                </div>
            </div>
            <div className="searchform__shortblock_320">
                <img className="searchform__toggle" src={searchToggle} alt="toggle button" />
                <p className="searchform__toggle-text">Короткометражки</p>
            </div>
        </form>
    )
}
export default SearchForm;