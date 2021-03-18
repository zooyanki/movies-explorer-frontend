import React from 'react';

import { useLocation} from 'react-router'

import accountLogo from '../../images/accaunt_icon.svg';
import navButton from '../../images/nav_mob_button.svg';
import logo from '../../images/navtab_logo.svg';

function Navigation(props){
    const location = useLocation();

    return(
        <div className={`navigation__block block-width_768`}>
            <a className="header__logo" href="/"><img src={logo} alt="Navigation Logo"/></a>
            <div className="navigation">
                <div className="header__leftside">                    
                    <div className="header__link-block">
                        <a className="navigation__link" href="/movies">Фильмы</a>
                        <a className="navigation__link" href="/saved-movies">Сохраненные фильмы</a>
                    </div>
                </div>
                <div className="header__rightside header__rightside_auth">
                    <a className="navigation__link" href="/profile" >Аккаунт</a>
                    <div className="header__account-block">
                        <img className="header__account-image" src={accountLogo} alt="Account_image"/>
                    </div>
                </div>
            </div>

            <div className="navigation__mobile">
                <button className="navigation__mobile-button" onClick={props.onOpenMenu}><img className="navigation__mobile-button-image" src={navButton} alt="navigation_button"/></button>
                <div className={`navigation__menu-cover ${props.menu === true ? 'navigation__menu-cover_open' :''}`}>
                    <div className="navigation__menu">
                        <button className="navigation__mobile-closebtn" onClick={props.onClose}></button>
                        <div className="navigation__mobile-links">
                            <a className={`navigation__link navigation__link_nav ${location.pathname === "/" ? 'navigation__link_border' : ''}`} href="/">Главная</a>
                            <a className={`navigation__link navigation__link_nav ${location.pathname === "/movies" ? 'navigation__link_border' : ''}`} href="/movies">Фильмы</a>
                            <a className={`navigation__link navigation__link_nav ${location.pathname === "/saved-movies" ? 'navigation__link_border' : ''}`} href="/saved-movies">Сохраненные фильмы</a>
                        </div>                        
                        <div className="navigation__account-block">
                            <a className={`navigation__link navigation__link_account ${location.pathname === "/profile" ? 'navigation__link_border' : ''}`} href="/profile">Аккаунт</a>
                            <div className="header__account-block">
                                <img className="header__account-image " src={accountLogo} alt="Account_image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation;