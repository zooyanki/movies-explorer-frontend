import React from 'react';

function Footer(props) {
    return (
        <div className={`block-width ${props.footerOff}`}>
            <div className="footer">
                <h4 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
                <div className="footer__nav">
                    <p className="footer__link">@2021</p>
                    <div className="footer__links">
                        <a className="footer__link" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a>
                        <a className="footer__link" href="https://github.com/zooyanki">GitHub</a>
                        <a className="footer__link" href="https://facebook.com">Facebook</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;