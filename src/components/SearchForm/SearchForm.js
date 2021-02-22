import React from 'react';

import searchLogo from '../../images/search_icon.svg'
import searchToggle from '../../images/search_smalltumb.svg';

function SearchForm() {
    return (
        <div className="searchform block-width">
            <form className="searchform__form">
                <img className="searchform__logo" src={searchLogo} alt="magnifying glass"/>
                <input className="searchform__input" type="text" value="Фильм"/>
                <button className="searchform__button" type="button">Найти</button>
                <div className="searchform__shortblock">
                    <img className="searchform__toggle" src={searchToggle} alt="toggle button" />
                    <p className="searchform__toggle-text">Короткометражки</p>
                </div>
            </form>
        </div>
    )
}
export default SearchForm;