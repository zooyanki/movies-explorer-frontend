import React from 'react';
import { useLocation } from 'react-router';

import logo from '../../images/navtab_logo.svg';


import Navigation from '../Navigation/Navigation';

function Header(props) {
    const location = useLocation();
        
    return (
        <div className={` ${location.pathname !== '/' ? `header_list` : 'header'} ${props.headerOff}`}>

            <div className={`header__block block-width ${location.pathname === '/' ? '' : 'block-off'}`}>
                <div className="header__leftside">
                    <a className="header__logo" href="/"><img src={logo} alt="Navigation Logo"/></a>
                </div>
                <div className="header__rightside">
                    <a className="header__signup" href="/signup">Регистрация</a>
                    <a className="header__signin" href="/signin">Войти</a>
                </div>
            </div>
 
            
            <Navigation menu={props.menu} onOpenMenu={props.onOpenMenu} onClose={props.onClose}/>

        </div>
    )
}

export default Header;