import axios from 'axios';


const moviesDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params:{
        api_key: '',
        language: 'es-ES'
    }
});

export default moviesDB;