import React from 'react'

import myPhoto from '../../images/myphoto.jpg'

import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <div className="aboutme block-width">
            <h2 className="common__header">Студент</h2>
            <div className="common__underline"></div>
            <div className="aboutme__info">
                <img className="aboutme__photo" src={myPhoto} alt="My foto"/>
                <h2 className="aboutme__name">Илья</h2>
                <h3 className="aboutme__status">Фронтенд-разработчик, 33 года</h3>
                <p className="aboutme__aboutme">
                    Я проживаю в Ростове-на-Дону, закончил факультет автоматизации и мехатроники ДГТУ. У меня есть жена 
                    и дочь. Мое хобби: бег, сноуборд и восстановление автомобилей. Недавно начал кодить. 
                    С 2012 года работаю в компании «Агро-строительные технологии». На сегодняшний заканчиваю обучение в Яндекс.Практикуме и
                    нахожусь в стадии поиска работы
                </p>
                <a className="aboutme__link" href="https://github.com/zooyanki">GitHub</a>
                
            </div>
            <Portfolio/>
        </div>
    )
}

export default AboutMe;