import { useEffect, useState } from "react"
import moviesDB from "../api/moviesDB";
import { MovieFull } from "../interfaces/moviesInterfaces";
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';

interface MovieDetails{
    isLoading: boolean;
    movieFull?: MovieFull;
    cast:Cast[];
}

export const useMovieDetails = ( movieId: number ) => {
    
    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async() => {
        const movieDetailsPromise = moviesDB.get<MovieFull>(`/${ movieId }`);
        const castPromise = moviesDB.get<CreditsResponse>(`/${ movieId }/credits`);

        const [ movieDetailsResponse, castPromiseResponse ] = await Promise.all([ movieDetailsPromise, castPromise ]);

        setState({
            isLoading: false,
            movieFull: movieDetailsResponse.data,
            cast: castPromiseResponse.data.cast
        });
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}
