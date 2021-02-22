import React from 'react';

function AboutProject() {
    return (
        <div className="aboutproject block-width">
            <h2 className="common__header">О проекте</h2>
            <div className="common__underline"></div>
            <div className="aboutproject__discription">
                <h3 className="aboutproject__dis-header">Дипломный проект включал 5 этапов</h3>
                <p className="aboutproject__text">
                    Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                </p>

                <h3 className="aboutproject__dis-header">На выполнение диплома ушло 5 недель</h3>
                <p className="aboutproject__text">
                    У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                </p>
            </div>
            <div className="aboutproject__time">
                <div className="aboutproject__weeks">
                    <p className="aboutproject__weeks-text"> 1 неделя</p>
                </div>
                <div className="aboutproject__weeks">
                    <p className="aboutproject__weeks-text aboutproject__weeks-text_white"> 4 недели</p>
                </div>
                <p className="aboutproject__label">Front-end</p>
                <p className="aboutproject__label">Back-end</p>
            </div>
        </div>
    )
}

export default AboutProject;