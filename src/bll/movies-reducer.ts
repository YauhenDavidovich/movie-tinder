import { Dispatch } from 'redux'
import {moviesAPI, MovieType} from "../dll/movies";

const initialState: Array<MovieType> = []

export const moviesReducer = (state: Array<MovieType> = initialState, action: ActionsType): Array<MovieType> =>  {
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
        moviesAPI.getMovies()
            .then((res) => {
                dispatch(setMoviesAC(res.data))
            })
    }
}

// types
export type SetMoviesActionType = ReturnType<typeof setMoviesAC>;
type ActionsType = SetMoviesActionType
type ThunkDispatch = Dispatch<ActionsType>
