import React from 'react';

import useInput from '../Validation/Validation'


import WithForm from '../WithForm/WithForm';


function Register() {
    const name = useInput('',{isEmpty:true, minLength: 2, maxLength:30});
 
    return(
        <WithForm header={`Добро пожаловать!`} buttonText={`Зарегистрироваться`} linkText={`Войти`} link={`/signin`} textReg={`Уже`}>
            <p className="withform__text">Имя</p>
            <input className={`withform__input ${(name.isDirty && name.minLengthError || name.isDirty && name.maxLengthError) && 'withform__input_validation'}`} name="name" type="text" value={name.value} onBlur={name.onBlur} onChange={name.onChange} required/>
            {(name.isDirty && name.minLengthError || name.isDirty && name.maxLengthError) && <p className="withform__validation">{name.errorMessage}</p>}

        </WithForm> 
    )
}

export default Register;
