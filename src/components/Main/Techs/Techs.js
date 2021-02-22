import React from 'react';

function Techs() {
    return (
        <div className="techs">
            <div className="techs__block block-width">
                <h2 className="common__header">Технологии</h2>
                <div className="common__underline"></div>
                <h3 className="techs__header">7 технологий</h3>
                <p className="techs__text">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <div className="techs__stacks">
                    <p className="techs__stack">HTML</p>
                    <p className="techs__stack">CSS</p>
                    <p className="techs__stack">JS</p>
                    <p className="techs__stack">React</p>
                    <p className="techs__stack">Git</p>
                    <p className="techs__stack">Express.js</p>
                    <p className="techs__stack">mongoDB</p>
                </div>
            </div>
        </div>
    )
}

export default Techs;