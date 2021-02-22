import React from 'react';

import Logo from '../../images/navtab_logo.svg';
import accountLogo from '../../images/accaunt_icon.svg';
import { useLocation } from 'react-router';

function Header(props) {
    const location = useLocation();
        
    return (
        <div className={` ${location.pathname !== '/' ? `header_list` : 'header'} ${props.headerOff}`}>

            <div className={`header__block block-width ${location.pathname === '/' ? '' : 'block-off'}`}>
                <div className="header__leftside">
                    <img className="header__logo" src={Logo} alt="Navigation Logo"/>
                </div>
                <div className="header__rightside">
                    <a className="header__signup" href="/signup">Регистрация</a>
                    <a className="header__signin" href="/signin">Войти</a>
                </div>
            </div>
 
            <div className={`header__block block-width ${location.pathname === '/' ? `block-off` : ''}`}>
                <div className="header__leftside">
                    <img className="header__logo" src={Logo} alt="Navigation Logo"/>
                    <div className="header__link-block">
                        <a className="header__link" href="/movies">Фильмы</a>
                        <a className="header__link" href="/saved-movies">Сохраненные фильмы</a>
                    </div>
                </div>
                <div className="header__rightside header__rightside_auth">
                    <a className="header__link" href="/profile" >Аккаунт</a>
                    <div className="header__account-block">
                        <img className="header__account-image" src={accountLogo} alt="Account_image"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header;