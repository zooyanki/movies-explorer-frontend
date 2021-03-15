import React from 'react';
import PromoLogo from '../../images/earth_logo.svg';

function Promo() {
    return (
        <div className="promo">
            <div className="promo__block block-width">
                <div className="promo__content">
                    <img className="promo__image" src={PromoLogo} alt="Earth form words Web"/>
                    <h1 className="promo__header">Учебный проект студента факультета Веб-разработки</h1>
                    <p className="promo__text">Листайте ниже, чтобы узнать про этот проект и его создателя</p>                    
                </div>
                <button className="promo__button">Узнать больше</button>
            </div>
        </div>
    )
}

export default Promo;