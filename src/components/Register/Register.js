import React from 'react';

import useInput from '../Validation/Validation'
import useFormValidation from '../Validation/Validation-Profile';


import WithForm from '../WithForm/WithForm';
import { useLocation } from 'react-router';


function Register(props) {
    const location = useLocation();

    const name = useFormValidation();
    const email = useFormValidation();
    const password = useFormValidation();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.values.email || !password.values.password) {
            return;
        }

        props.onRegister({
            name: name.values.name,
            email: email.values.email,
            password: password.values.password
        })
    }

    return(
        <WithForm header={`Добро пожаловать!`} linkText={`Войти`} link={`/signin`} textReg={`Уже`}>
            <p className="withform__text">Имя</p>
            <input 
                className={`withform__input ${name.isValid && 'withform__input_validation'}`} 
                name="name" 
                type="text" 
                defaultValue='' 
                onChange={name.handleChange} 
                autoFocus
                minLength="2"
                maxLenght="30" 
                required
            />
            <div className="withform__validation-block">
                {!name.isValid && <p className="withform__validation">{name.errors.name}</p>}
            </div>

            <p className="withform__text">Почта</p>
            <input  
                className={`withform__input ${email.isValid && 'withform__input_validation'}`} 
                name="email" 
                type="email" 
                defaultValue=''
                onChange={email.handleChange} 
                autoFocus 
                required
            />
            <div className="withform__validation-block">
                {!email.isValid && <p className="withform__validation">{email.errors.email}</p>}
            </div>
            
            <p className="withform__text">Пароль</p>
            <input 
                className={`withform__input ${password.isValid && 'withform__input_validation'}`} 
                name="password" 
                type="password" 
                defaultValue=''
                onChange={password.handleChange} 
                autoFocus
                minLength="5" 
                required
            />
            <div className="withform__validation-block">
                {!password.isValid && <p className="withform__validation">{password.errors.password}</p>}
            </div>

            <button 
                className={`withform__button ${location.pathname === '/signin' ? 'withform__button_signin' :''}`} 
                type="submit" 
                disabled={!email.isValid || !password.isValid || !name.isValid}
                onClick={handleSubmit}
            >
                Зарегистрироваться
            </button>
        </WithForm> 
    )
}

export default Register;
