import {Dispatch} from 'redux'
import getMovies from "../dll/movies";

export type MovieType = {
    id:       string;
    imageURL: string;
    title:    string;
    summary:  string;
    rating:   number;
}

const initialState: Array<MovieType> = []

export const moviesReducer = (state: Array<MovieType> = initialState, action: ActionsType): Array<MovieType> => {
    switch (action.type) {
        case 'SET-MOVIES':
            return action.movies.map(movies => ({...movies}))
        default:
            return state
    }
}

export const setMoviesAC = (movies: Array<MovieType>) => ({type: 'SET-MOVIES', movies} as const)

// thunks
export const fetchMoviesTC = () => {
    return (dispatch: ThunkDispatch) => {
        getMovies()
            .then((res) => {
                dispatch(setMoviesAC(res))
            })
    }
}

// types
export type SetMoviesActionType = ReturnType<typeof setMoviesAC>;
type ActionsType = SetMoviesActionType
type ThunkDispatch = Dispatch<ActionsType>
