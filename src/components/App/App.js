import React, {useState, useEffect, Suspense} from 'react';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';

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


function App() {
    const location = useLocation();
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
        moviesApi.getMoviesCard()
            .then((item) => {
            console.log('Жигули')
            setMoviesCard(item);
            })
            .catch((err) => {
                console.log(err);
                setErrorModal(err);
            })
        
        //Сохраненные кино-карточки
        mainApi.getLikeMovies()
            .then((movies) => {
                setSavedMoviesCard(movies)
        })
            .catch((err) => {
                console.log(err);
                setErrorModal(err);
            })
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
            })
            .catch((err) => {
                console.log(err);
                setErrorModal(err);
            })                
    }

    const delLikeCard = (savedCard) => {
    
        mainApi.delLikeMovie(savedCard)
        .then(() => {
            const newMoviesCards = moviesCard.filter(card => card.id !== savedCard.movieId);
            setMoviesCard(newMoviesCards);
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
                        console.log('НОга')
                        history.push('/movies');
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
                    setLoggedIn(true);
                    history.push('/movies');
            
        } 
        })
        .catch((err)=>{
            console.log({err});
            setErrorModal(err);
        })
    }
    //Выход из кабинета
    const onLogout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            setLoggedIn(false);
            history.push('/signin');
        }
    }

    const handleUpdateUser = (userData) => {
        mainApi.setUserInfo(userData.email, userData.name)
        .then((email, name) => {
            setCurrentUser(email, name);
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
                        </Switch>
                    </main>
                    <Footer/>
                </div>
                
                <Error error={errorModal} onClose={close}/>
            </div>
        </SavedMoviesContext.Provider>
        </MoviesContext.Provider>
        </CurrentUserContext.Provider>
        </Suspense>
    );
}

export default App;