import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {acceptMovieTC, fetchMoviesTC, MovieType, rejectMovieTC} from "./bll/movies-reducer";
import {AppRootStateType} from "./bll/store";
import TinderMovieCard from "./components/TinderMovieCard";


function App() {
    let alreadyRemoved = [] as Array<string>
    const dispatch = useDispatch();
    const moviesData = useSelector<AppRootStateType, Array<MovieType>>(state => state.movies)
    const childRefs = useMemo(() => Array(moviesData.length).fill(0).map(i => React.createRef<any>()), [moviesData])
    const [movies, setMovies] = useState(moviesData)
    const [reviewedFilms, setReviewedFilms] = useState(alreadyRemoved)
    let moviesState = moviesData

    useEffect(() => {
        dispatch(fetchMoviesTC());
    }, [])

    useEffect(() => {
        setMovies(moviesState);
    }, [moviesState])


    const swiped = (direction: any, id: string) => {
        reviewedFilms.push(id)
        setReviewedFilms(reviewedFilms)
        debugger
        outOfFrame(id)
        {
            direction !== "right" ? rejectMovieTC(id) : acceptMovieTC(id)
        }
    }
    const outOfFrame = (id: string) => {
        moviesState = moviesState.filter(movie => movie.id !== id)
        setMovies(moviesState)
    }
    const swipe = (dir: string) => {
        const cardsLeft = movies.filter(movie => !reviewedFilms.includes(movie.id))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].id
            const index = moviesData.map(movie => movie.id).indexOf(toBeRemoved)
            alreadyRemoved.push(toBeRemoved)
            setReviewedFilms(alreadyRemoved)
            childRefs[index]?.current?.swipe(dir)
        }
    }


    return (
        <div className="App">
            <h1>Movie Tinder</h1>
            <div className='cardContainer'>
                {moviesState.map((movie, index) =>
                    <TinderMovieCard key={movie.id} childRefs={childRefs} index={index}
                                     onSwipe={(dir: any) => swiped(dir, movie.id)}
                                     onCardLeftScreen={() => outOfFrame(movie.id)} movie={movie}/>
                )}
            </div>
            {reviewedFilms.length !== moviesData.length ? <div className='buttons'>
                <button className='button-reject' onClick={() => swipe('left')}>Reject</button>
                <button className='button-accept' onClick={() => swipe('right')}>Accept</button>
            </div> : <></>
            }
            {reviewedFilms.length !== moviesData.length ? <h2 className='infoText'>Swipe a card to the right to accept!</h2> : <h2>You've seen all the movies!</h2>}

        </div>
    );
}

export default App;
