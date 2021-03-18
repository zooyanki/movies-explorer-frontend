import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router';
import {withRouter} from 'react-router-dom';

import logo from '../../images/navtab_logo.svg';
import Navigation from '../Navigation/Navigation';

function Header(props) {
    const location = useLocation();

    const [headerOff, setHeaderOff] = useState();
    useEffect(() => {
        if (location.pathname === '/signin') {
            setHeaderOff('block-off');  
        } else if (location.pathname === '/signup') {
            setHeaderOff('block-off');  
        } else {
            setHeaderOff('')
        }
    },
        [location.pathname]
    )

    
        
    return (
        <>
            <div className={` ${location.pathname !== '/' ? `header_list` : 'header'} ${headerOff}`}>

                {!localStorage.getItem('token')
                    ? <div className={`header__block block-width`}>
                        <div className="header__leftside"> 
                            <a className="header__logo" href="/"><img src={logo} alt="Navigation Logo"/></a>
                        </div>
                        <div className="header__rightside">
                            <a className="header__signup" href="/signup">Регистрация</a>
                            <a className="header__signin" href="/signin">Войти</a>
                        </div>
                    </div>
    
                
                    : <Navigation menu={props.menu} onOpenMenu={props.onOpenMenu} onClose={props.onClose}/>}

            </div>
        </>
    )
}

export default withRouter(Header);