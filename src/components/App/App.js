import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {withRouter, useLocation} from 'react-router';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SearchForm from '../SearchForm/SearchForm';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import WithForm from '../WithForm/WithForm';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';

function App() {
    const location = useLocation();

    const [headerOff, setHeaderOff] = useState();
    const [footerOff, setFooterOff] = useState();

    useEffect(()=> {
        if (location.pathname === '/signin') {
            setHeaderOff('block-off');
            setFooterOff('block-off');
        }

        if (location.pathname === '/signup') {
            setHeaderOff('block-off');
            setFooterOff('block-off');
        }

        if (location.pathname === '/profile') {
            setFooterOff('block-off');
        }
    })

    return (
        <div className="app">
            <div className="content">
                <Header headerOff={headerOff}/>
                <main>
                    <Route exact path="/">                            
                        <Main/>
                    </Route>
                    <Route path="/movies">
                        <SearchForm/>                            
                        <Movies buttonModificator={`_like`}/>
                    </Route>
                    <Route path="/saved-movies">
                        <SearchForm/>
                        <SavedMovies buttonModificator={'_delete'}/>
                    </Route>
                    <Route path="/profile" >
                        <Profile userName={`Илья`} email={'zooyanki@yandex.ru'}/>
                    </Route>
                    <Route path="/signin">
                        <Login/>
                    </Route>
                    <Route path="/signup">
                        <Register/>
                    </Route>
                    <Route path="/error">
                        <Error status={"404"} message={"Страница не найдена"}/>
                    </Route>                        
                </main>
                <Footer footerOff={footerOff}/>
            </div>
        </div>

    );
}

export default App;