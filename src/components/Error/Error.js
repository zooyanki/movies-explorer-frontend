import React from 'react';
import { useHistory } from 'react-router';

function Error(props) {
    const history = useHistory();
    return (
        <div className={`${props.error ? 'error_open' : 'error'}`}>
            <div className="error__block">
                <h3 className="error__header">{props.error.status}</h3>
                <p className="error__message">{props.error.statusText}</p>
                <button className="error__link" onClick={props.onClose? props.onClose : history.goBack}>Назад</button>
            </div>
        </div>
    )
}

export default Error;