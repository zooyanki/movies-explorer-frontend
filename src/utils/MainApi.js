export default class MainApi {
    constructor(options) {
        this.headers = options.headers;
        this.baseUrl = options.baseUrl;
    }


    _fetch(url, opt={}) {      
        return fetch(this.baseUrl+url,{
            headers: {
                ...this.headers, 
                'authorization': 'Bearer '+ window.localStorage.getItem('token')},
                ...opt}
        )
        .then((res) => {
            try {
                if (res.ok) {
                    return res.json();
                }
            }
            catch(error) {
                console.log(error)
                return (error)
  
            }
          return Promise.reject(res);
        })
      }
    
    //------------------------ База фильмов-------------------------------//
    getLikeMovies() {
        return this._fetch('/movies')
    }

    addLikeMovie(movieId, country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail) {
        return this._fetch('/movies', {
            method: 'POST',
            body: JSON.stringify({
                movieId: movieId,
                country: country, 
                director: director, 
                duration: duration, 
                year: year, 
                description: description, 
                image: image, 
                trailer: trailer, 
                nameRU: nameRU, 
                nameEN: nameEN, 
                thumbnail: thumbnail
            })
        })
    }

    delLikeMovie(savedCard) {
        return this._fetch(`/movies/${savedCard._id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                _id: savedCard._id
            })
        })
    }


    //---------------------- Данные пользователя------------------------------- //
    getUserInfo(token) {
        return this._fetch(`/users/me`, {
            method: 'GET'
        })
    }

    setUserInfo(email, name) {
        return this._fetch('/users/me', {
            method: 'PATCH',
            body: JSON.stringify({
                email: email,
                name: name
            })
        })
    }

    signin(email, password) {
        return this._fetch(`/signin`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            }
        })
    }

    signup(name, email, password) {
        return this._fetch(`/signup`, {
            method:'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
    }  
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.okino.students.nomoredomains.rocks',
    headers: {
        'Content-Type':'application/json',
        'authorization': 'Bearer '+ window.localStorage.getItem('token')
    }
})