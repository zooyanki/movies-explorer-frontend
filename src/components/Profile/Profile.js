import React from 'react';

function Profile(props) {
    return (
        <form className="profile">
            <h2 className="profile__header">Привет, {props.userName}!</h2>
            <div className="profile__name">
                <p className="profile__text">Имя</p>
                <input className="profile__input" name="name" type="text" minLength="2" maxLength="30"/>
            </div>
            <div className="profile__name">
                <p className="profile__text">Почта</p>
                <input className="profile__input" name="email" type="email"/>
            </div>
            <button className="profile__button" type="submit">Редактировать</button>
            <button className="profile__button" type="button">Выйти из аккаунта</button>
        </form>
    )
}

export default Profile;