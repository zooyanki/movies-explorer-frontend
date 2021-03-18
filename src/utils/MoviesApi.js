export default class MoviesApi {
    constructor(options) {
        this.headers = options.headers;
        this.baseUrl = options.baseUrl;
    }

    _fetch(url, opt={}) {      
        return fetch(this.baseUrl+url,{headers: this.headers, ...opt})
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Хьюстон, у нас проблемы: ${res.status}`);
        })
      }

      getMoviesCard(){
      return this._fetch(`/beatfilm-movies`)}
      
}


export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
})