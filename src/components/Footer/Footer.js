import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router';


function Footer(props) {
    const location = useLocation();

    const [footerWidth, setFooterWidth] = useState('block-width');
    const [footerOff, setFooterOff] = useState();

    useEffect(() => {        
        if (location.pathname === "/movies" ) {
            setFooterWidth('block-width_768');
        }

        if (location.pathname === "/saved-movies" ) {
            setFooterWidth('block-width_768')
        }
        
        if (location.pathname === '/signin') {
            setFooterOff('block-off');
        } else if (location.pathname === '/signup') {
            setFooterOff('block-off');
        } else if (location.pathname === '/profile') {
            setFooterOff('block-off');
        } else  {
            setFooterOff('')
        }
    },    
        [location.pathname]
    )
   
    return (
        <div className={`${footerWidth} ${footerOff}`}>
            <div className="footer">
                <h4 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
                <div className="footer__nav">
                    <p className="footer__date">@2021</p>
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