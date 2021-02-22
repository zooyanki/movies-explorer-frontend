import React from 'react';

import WithForm from '../WithForm/WithForm';

function Login(props) {
    return(
        <WithForm header={`Рады видеть!`} buttonText={`Войти`} linkText={`Регистрация`} link={`/signup`} textReg={`Ещё не`}>

        </WithForm>    
    )
}

export default Login;