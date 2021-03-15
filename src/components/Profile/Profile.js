import React, { useContext, useState, useEffect } from 'react';

import useInput from '../Validation/Validation';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import useFormValidation from '../Validation/Validation-Profile';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser);
    
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onUpdateUser({
            email: emailVal.values.email,
            name: nameVal.values.name
        })
    }

    useEffect(()=> {
        setUserName(currentUser&&currentUser.name)
        setUserEmail(currentUser&&currentUser.email)
    },[currentUser])

    const submit = (...args) => {
        const event = args[0];
        event.preventDefault();
        props.onSubmit(...args);
    }
    
    const nameVal = useFormValidation();
    const emailVal = useFormValidation();

    return (
        <form className="profile" onSubmit={submit}>
            <h2 className="profile__header">Привет, {userName}!</h2>

            <div className="profile__name">
                <p className="profile__text">Имя</p>
                <input 
                    className="profile__input" 
                    name="name" 
                    type="text" 
                    defaultValue={userName} 
                    onChange={nameVal.handleChange}
                    minLength="2" 
                    maxLength="30"
                />                
            </div>
            <p className={`profile__validation ${nameVal.isValid ? 'profile__validation_off' : ''}`}>{nameVal.errors.name}</p>
            
            <div className="profile__name">
                <p className="profile__text">Почта</p>
                <input 
                    className="profile__input" 
                    name="email" 
                    type="email"
                    defaultValue={userEmail} 
                    onChange={emailVal.handleChange}
                />
            </div>
            <p className={`profile__validation ${emailVal.isValid ? 'profile__validation_off' : ''}`}>{emailVal.errors.email}</p>

            <button className="profile__button" type="submit" onClick={handleSubmit}>Редактировать</button>
            <button className="profile__button" type="button" onClick={props.onLogout}>Выйти из аккаунта</button>
        </form>
    )
}

export default Profile;


