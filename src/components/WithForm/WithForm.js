import React, { useEffect, useState } from 'react';

import logo from '../../images/navtab_logo.svg'
import { useLocation } from 'react-router';

function WithForm(props) {
    const location = useLocation();

    return(
        <form className="withform">
            <img className="withform__logo" src={logo} alt="logo"/>
            <h2 className="withform__header">{props.header}</h2>

            <>{props.children}</>

            <p className="withform__text">Почта</p>
            <input className="withform__input" name="email" type="email" required/>
            <p className="withform__validation">ХУЙ</p>

            <p className="withform__text">Пароль</p>
            <input className="withform__input" name="password" type="password" minLength="5" required/>
            <p className="withform__validation">ХУЙ</p>

            <button className={`withform__button ${location.pathname === '/signin' ? 'withform__button_signin' :''}`} type="submit">{props.buttonText}</button>
            <p className="withform__text-reg">{props.textReg} зарегистрированы?<a className="withform__link" href={props.link}>{props.linkText}</a></p>
        </form>
    )
}

export default WithForm;