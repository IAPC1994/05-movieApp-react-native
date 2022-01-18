import { useEffect, useState } from "react";
import moviesDB from "../api/moviesDB";
import { Movie, MoviesDBResponse } from '../interfaces/moviesInterfaces';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: []
    });

    const getMovies = async() => {
        
        const nowPlayingPromise = moviesDB.get<MoviesDBResponse>('/now_playing');
        const popularPromise    =  moviesDB.get<MoviesDBResponse>('/popular');
        const topRatedPromise   =  moviesDB.get<MoviesDBResponse>('/top_rated');
        const upcomingPromise   =  moviesDB.get<MoviesDBResponse>('/upcoming');

        const response = await Promise.all([ nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise ]);

        setMoviesState({
            nowPlaying: response[0].data.results,
            popular: response[1].data.results,
            topRated: response[2].data.results,
            upcoming: response[3].data.results
        });

        setIsLoading( false );
    }

    useEffect(() => {
        // now_playing
        getMovies();
      
    }, [])

    return {
        ...moviesState,
        isLoading
    }
}
