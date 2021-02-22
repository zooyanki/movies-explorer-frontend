import React from 'react';

function Error(props) {
    return (
        <div className="error">
            <h3 className="error__header">{props.status}</h3>
            <p className="error__message">{props.message}</p>
            <a className="error__link">Назад</a>
        </div>
    )
}

export default Error;