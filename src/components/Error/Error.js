import React from 'react';

function Error(props) {
    return (
        <div className={`${props.error ? 'error_open' : 'error'}`}>
            <h3 className="error__header">{props.error.status}</h3>
            <p className="error__message">{props.error.statusText}</p>
            <button className="error__link" onClick={props.onClose}>Назад</button>
        </div>
    )
}

export default Error;