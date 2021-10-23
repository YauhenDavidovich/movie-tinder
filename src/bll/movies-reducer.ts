import {Dispatch} from 'redux'
import getMovies from "../dll/movies";
import {recomendationsAPI} from "../dll/recomedations";

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
        case 'ACCEPT-MOVIE':
            return state

        default:
            return state
    }
}

export const setMoviesAC = (movies: Array<MovieType>) => ({type: 'SET-MOVIES', movies} as const)
export const acceptMoviesAC = (id: string) => ({type: 'ACCEPT-MOVIE', id} as const)
export const rejectMoviesAC = (id: string) => ({type: 'REJECT-MOVIE', id} as const)

// thunks
export const fetchMoviesTC = () => {
    return (dispatch: ThunkDispatch) => {
        getMovies()
            .then((res) => {
                dispatch(setMoviesAC(res))
            })
    }
}

export const acceptMovieTC = (id:string) => {
    console.log("Movie " +id+" was accepted")
    return (dispatch: ThunkDispatch) => {
        recomendationsAPI.accept(id)
            .then(() => {
                dispatch(acceptMoviesAC(id))
            })
    }
}

export const rejectMovieTC = (id:string) => {
    console.log("Movie " +id+" was rejectedted")
    return (dispatch: ThunkDispatch) => {
        recomendationsAPI.reject(id)
            .then(() => {
                dispatch(rejectMoviesAC(id))
            })
    }
}

// types
export type SetMoviesActionType = ReturnType<typeof setMoviesAC>;
export type AcceptMovieActionType = ReturnType<typeof acceptMoviesAC>;
export type RejectMovieActionType = ReturnType<typeof rejectMoviesAC>;
type ActionsType = SetMoviesActionType | AcceptMovieActionType | RejectMovieActionType
type ThunkDispatch = Dispatch<ActionsType>
