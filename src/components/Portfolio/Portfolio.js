import React from 'react';

import cursor from '../../images/portfolio_cursor.svg'

function Portfolio() {
    return(
        <div className="portfolio">
            <h3 className="portfolio__header">Портфолио</h3>
            <a className="portfolio__link" href="https://zooyanki.github.io/how-to-learn/">
                <p className="portfolio__text" >Статичный сайт</p>
                <img className="portfolio__logo" src={cursor} alt="Cursor"/>
            </a>
            <a className="portfolio__link" href="https://zooyanki.github.io/russian-travel/">
                <p className="portfolio__text">Адаптивный сайт</p>
                <img className="portfolio__logo" src={cursor} alt="Cursor"/>
            </a>
            <a className="portfolio__link" href="https://zooyanki.students.nomoredomains.rocks">
                <p className="portfolio__text">Одностраничное приложение</p>
                <img className="portfolio__logo" src={cursor} alt="Cursor"/>
            </a>
        </div>
    )
}

export default Portfolio;