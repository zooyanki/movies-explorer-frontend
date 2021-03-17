import React from 'react';
import { useLocation, withRouter } from 'react-router';

import WithForm from '../WithForm/WithForm';
import useFormValidation from '../Validation/Validation';


function Login(props) {
    const location = useLocation();

    const email = useFormValidation();
    const password = useFormValidation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.values.email || !password.values.password) {
            return;
        }
        
        props.onLogin({
            email: email.values.email,
            password: password.values.password
        })

        email.resetForm();
        password.resetForm();
    }

    return(
        <WithForm header={`Рады видеть!`} linkText={`Регистрация`} link={`/signup`} textReg={`Ещё не`}>
            <p className="withform__text">Почта</p>
            <input  
                className={`withform__input ${!email.isValid && 'withform__input_validation'}`} 
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
                className={`withform__input ${!password.isValid && 'withform__input_validation'}`} 
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
                disabled={!email.isValid || !password.isValid}
                onClick={handleSubmit}
            >
                Войти
            </button>
        </WithForm>    
    )
}

export default withRouter(Login);