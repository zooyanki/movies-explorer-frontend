import React from 'react';

function Popup(props) {

    return (
        <div className={`${props.popupOn ? 'popup_on' : 'popup'}`}>
            <div className="popup__form">
                <h3 className="popup__header">{props.popupOn}</h3>
                <button className="popup__button" onClick={props.onClose}>OK</button>
            </div>
                
        </div>
    )
}

export default Popup;