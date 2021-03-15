import React, { useEffect, useState } from 'react';


import logo from '../../images/navtab_logo.svg'
import { useLocation } from 'react-router';

import useInput from '../Validation/Validation';
   
function WithForm(props) {
    const location = useLocation();

    const email = useInput('', {isEmpty:true, emailError: true});
    const password = useInput('', {isEmpty:true, minLength: 5});
    return (
        
                    <form className="withform">

                        
                        <a className="withform__logo" href="/"><img src={logo} alt="logo"/></a>
                        <h2 className="withform__header">{props.header}</h2>

                        <>{props.children}</>

                        <p className="withform__text">Почта</p>
                        <input  className={`withform__input ${(email.isDirty && email.emailError) && 'withform__input_validation'}`} name="email" type="email" value={email.value} onBlur={email.onBlur} onChange={email.onChange} required/>
                        {(email.isDirty && email.emailError) && <p className="withform__validation">{email.errorMessage}</p>}

                        <p className="withform__text">Пароль</p>
                        <input className={`withform__input ${(password.isDirty && password.minLengthError) && 'withform__input_validation'}`} name="password" type="password" value={password.value} onBlur={password.onBlur} onChange={password.onChange} required/>
                        {(password.isDirty && password.minLengthError) && <p className="withform__validation">{password.errorMessage}</p>}

                        <button className={`withform__button ${location.pathname === '/signin' ? 'withform__button_signin' :''}`} type="submit" disabled={!email.inputValid || !password.inputValid}>
                            {props.buttonText}
                        </button>
                        <p className="withform__text-reg">{props.textReg} зарегистрированы?<a className="withform__link" href={props.link}>{props.linkText}</a></p>
                    </form>
               
    )
}

export default WithForm;
