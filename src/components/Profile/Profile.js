import React, { useContext, useState, useEffect } from 'react';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import useFormValidation from '../Validation/Validation';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [buttonDisableName, setButtonDisableName] = useState(true);
    const [buttonDisableEmail, setButtonDisableEmail] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onUpdateUser({
            email: emailVal.values.email,
            name: nameVal.values.name
        })
    }   

    const submit = (...args) => {
        const event = args[0];
        event.preventDefault();
        props.onSubmit(...args);
    }
    
    const nameVal = useFormValidation();
    const emailVal = useFormValidation();
    
    useEffect(()=> {
        setUserName(currentUser&&currentUser.name)
        setUserEmail(currentUser&&currentUser.email)

    
        if (((nameVal&&nameVal.values.name) === userName)|| ((nameVal&&nameVal.values.name) === undefined)) {
            setButtonDisableName(true);
        } else {
            setButtonDisableName(false)
        }

        if (((emailVal&&emailVal.values.email) === userEmail)||((emailVal&&emailVal.values.email) === undefined)){
            setButtonDisableEmail(true)
        } else {
            setButtonDisableEmail(false)
        }
 
        console.log(buttonDisableName)
        console.log(buttonDisableEmail)
        console.log(`UserContext:${userName}`)
        console.log(`Name Value:${nameVal.values.name}`)


    },[currentUser, emailVal, nameVal])

    

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

            <button 
                className="profile__button" 
                type="submit" 
                onClick={handleSubmit} 
                disabled={buttonDisableName && buttonDisableEmail}
            >Редактировать
            </button>

            <button 
                className="profile__button" 
                type="button" 
                onClick={props.onLogout}
            >Выйти из аккаунта</button>
        </form>
    )
}

export default Profile;


