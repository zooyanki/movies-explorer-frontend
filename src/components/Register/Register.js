import React from 'react';

import WithForm from '../WithForm/WithForm';


function Register() {
    return(
        <WithForm header={`Добро пожаловать!`} buttonText={`Зарегистрироваться`} linkText={`Войти`} link={`/signin`} textReg={`Уже`}>
            <p className="withform__text">Имя</p>
            <input className="withform__input" name="name" type="text" minLength="2" maxLength="30" required/>
            <p className="withform__validation">ХУЙ</p>
        </WithForm> 
    )
}

export default Register;
