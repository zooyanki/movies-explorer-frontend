import React, {useState, useEffect, Suspense} from 'react';
import {Redirect, Switch, Route, useHistory, useLocation} from 'react-router-dom';

//Api
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
//Context
import {CurrentUserContext, MoviesContext, SavedMoviesContext} from '../../contexts/CurrentUserContext';
//Components
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import Preloader from '../Preloader/Preloader';
import Popup from '../Popup/Popup';


function App() {

    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();    
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [targetCard, setTargetCard] = useState();
    const [savedMoviesCard, setSavedMoviesCard] = useState([]); //UserApi
    const [moviesCard, setMoviesCard] = useState([]); //Beatfilms
    const [foundMovie, setFoundMovie] = useState([]);
    
    const [navigationMenu, setNavigationMenu] = useState(false);   
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [popupOn, setPopupOn] = useState(false);
    
    useEffect(()=> {
        //Данные пользователя
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');

            mainApi.getUserInfo(token)
                .then((userData) => {
                    if (userData) {
                        setLoggedIn(true);
                        setCurrentUser(userData);
                        setUserName(userData.name);
                        setUserEmail(userData.email);                    
                    };
                })
                .catch((err) => {
                    console.log(err);
                    setErrorModal(err);
                })
        
        //Данные кино-карточек
        if (localStorage.getItem('beatfilms')) {
            const beatfilmsArray = JSON.parse(localStorage.getItem('beatfilms'));
            setMoviesCard(beatfilmsArray); 
        } else {
            moviesApi.getMoviesCard()
                .then((beatfilms) => {
                    setMoviesCard(beatfilms);
                    localStorage.setItem('beatfilms', JSON.stringify(beatfilms))
                })
                .catch((err) => {
                    console.log(err);
                    setErrorModal(err);
                })
        }
        
        //Сохраненные кино-карточки
        if (localStorage.getItem('savedfilms')) {
            const savedfilmsArray = JSON.parse(localStorage.getItem('savedfilms'));
            setSavedMoviesCard(savedfilmsArray);
        } else {
            mainApi.getLikeMovies()
                .then((savedfilms) => {
                    setSavedMoviesCard(savedfilms)
                    localStorage.setItem('savedfilms', JSON.stringify(savedfilms))
                })
                .catch((err) => {
                    console.log(err);
                    setErrorModal(err);
                })
        }
        }       
    },
        [loggedIn, targetCard]
    )
    //-----------------------Поиск по имени фильма------------------//
    const searchMovie = (foundMovie) => {
        setFoundMovie(foundMovie)
    }

    //---------------------Сохранение/удаление катрочек----------------------------//
    const addLikeCard = (moviesCard) => {
        mainApi.addLikeMovie(
            moviesCard.movieId,
            moviesCard.country, 
            moviesCard.director, 
            moviesCard.duration, 
            moviesCard.year, 
            moviesCard.description, 
            moviesCard.image, 
            moviesCard.trailer, 
            moviesCard.nameRU, 
            moviesCard.nameEN, 
            moviesCard.thumbnail 
            )
            .then((savedCard) => {
                setSavedMoviesCard([savedCard, ...savedMoviesCard])
                localStorage.setItem('savedfilms', JSON.stringify([savedCard, ...savedMoviesCard]))
            })
            .catch((err) => {
                console.log(err);
                setErrorModal(err);
            })                
    }

    const delLikeCard = (savedCard) => {
    
        mainApi.delLikeMovie(savedCard)
        .then(() => {
            console.log(savedCard)
            const newMoviesCards = savedMoviesCard.filter(card => card.movieId !== savedCard.movieId);
            setSavedMoviesCard(newMoviesCards);
            localStorage.setItem('savedfilms', JSON.stringify(newMoviesCards))
            setTargetCard(savedCard);
            
        })
        .catch((err) => {
            console.log(err);
            setErrorModal(err);
        })
    }
   
    //------------------------- Регистрация и авторизация --------------------------//
    //Регистрация
    const onRegister = (userData) => {
        mainApi.signup(userData.name, userData.email, userData.password)
        .then((res) => {
            if (res) {
                
                mainApi.signin(userData.email, userData.password)
                .then((data) => {
                    if (data.token) {
                        setLoggedIn(true);
                        history.push('/movies');
                        setPopupOn('Вы успешно зарегистрировались')
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
            setErrorModal(err);
        })
    }
    //Авторизация
    const onLogin = (userData) => {
        mainApi.signin(userData.email, userData.password)
        .then((data) => {
                if (data.token) {
                    setPopupOn('Вы успешно авторизировались')
                    setLoggedIn(true);
                    history.push('/movies');
            
        } 
        })
        .catch((err)=>{
            setErrorModal(err);
        })
    }
    //Выход из кабинета
    const onLogout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            localStorage.removeItem('savedfilms');
            localStorage.removeItem('beatfilms');
            setLoggedIn(false);
            history.push('/signin');
        }
    }

    const handleUpdateUser = (userData) => {
        mainApi.setUserInfo(userData.email, userData.name)
        .then((email, name) => {
            setCurrentUser(email, name);
            setPopupOn('Данные пользователя изменены')
        })
        .catch((err) =>{
            console.log(err); 
            setErrorModal(err);
        })
    }
    
    const openNavigationMenu = () => {
        setNavigationMenu(true);
    }

    const close = () => {
        setNavigationMenu(false);
        setErrorModal(false);
        setPopupOn(false);
    }

    return (
        <Suspense fallback={Preloader}>
        <CurrentUserContext.Provider value={currentUser}>
        <MoviesContext.Provider value={moviesCard}>
        <SavedMoviesContext.Provider value={savedMoviesCard}>
            <div className="app">
                <div className="content">
                    <Header menu={navigationMenu} onOpenMenu={openNavigationMenu} onClose={close}/>
                    <main>
                        <Switch>                         
                            <ProtectedRoute 
                                exact path="/movies" 
                                component={Movies} 
                                cards={moviesCard} 
                                onAddLikeCard={addLikeCard} 
                                onDelLikeCard={delLikeCard} 
                                onSearchMovie={searchMovie} 
                                foundMovie={foundMovie} 
                            />

                            <ProtectedRoute 
                                exact path="/saved-movies" 
                                component={SavedMovies} 
                                cards={savedMoviesCard} 
                                onDelLikeCard={delLikeCard} 
                                onSearchMovie={searchMovie} 
                                foundMovie={foundMovie} 
                            />

                            <ProtectedRoute 
                                exact path="/profile" 
                                component={Profile} 
                                onUpdateUser={handleUpdateUser} 
                                userName={userName} 
                                userEmail={userEmail} 
                                onLogout={onLogout}
                            />
                            
                            <Route exact path="/"> 
                                <Main/> 
                            </Route>                          

                            <Route exact path="/signin">
                                <Login onLogin={onLogin}/>
                            </Route>

                            <Route exact path="/signup">
                                <Register onRegister={onRegister}/>
                            </Route>

                            <Route path="*">
                                <Error error={{status: 404, statusText: 'Упс... Страница не найдена'}}/>
                            </Route> 
                        </Switch>
                    </main>
                    <Footer/>
                </div>
                
                <Error error={errorModal} onClose={close}/>
                <Popup popupOn={popupOn} onClose={close}/>
            </div>
        </SavedMoviesContext.Provider>
        </MoviesContext.Provider>
        </CurrentUserContext.Provider>
        </Suspense>
    );
}

export default App;