import React, { useEffect, useState } from 'react';


import logo from '../../images/navtab_logo.svg'
import { useLocation } from 'react-router';

import useInput from '../Validation/Validation';
   
function WithForm(props) {
    return (
        
                    <form className="withform">

                        
                        <a className="withform__logo" href="/"><img src={logo} alt="logo"/></a>
                        <h2 className="withform__header">{props.header}</h2>

                        <>{props.children}</>

                        <p className="withform__text-reg">{props.textReg} зарегистрированы?<a className="withform__link" href={props.link}>{props.linkText}</a></p>
                    </form>
               
    )
}

export default WithForm;
