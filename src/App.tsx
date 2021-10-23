import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {acceptMovieTC, fetchMoviesTC, MovieType, rejectMovieTC} from "./bll/movies-reducer";
import {AppRootStateType} from "./bll/store";
import TinderCard from 'react-tinder-card'



function App() {
    const alreadyRemoved = [] as Array<string>
    const dispatch = useDispatch();
    const moviesData = useSelector<AppRootStateType, Array<MovieType>>(state => state.movies)
    const childRefs = useMemo(() => Array(moviesData.length).fill(0).map(i => React.createRef<any>()), [moviesData])
    const [movies, setMovies] = useState(moviesData)
    let moviesState = moviesData

    useEffect(() => {
        dispatch(fetchMoviesTC());
    }, [dispatch])

    useEffect(() => {
        setMovies(moviesData);
    }, [moviesData])




    const swiped = (direction: any, id: string) => {
        alreadyRemoved.push(id)
        outOfFrame(id)
        {
            direction === "right" || "left" ? rejectMovieTC(id) : acceptMovieTC(id)
        }
    }
    const outOfFrame = (id:string) => {
        moviesState = moviesState.filter(movie => movie.id !== id)
        setMovies(moviesState)
        console.log(moviesState)
    }
    const swipe = (dir: string) => {
        const cardsLeft = movies.filter(movie => !alreadyRemoved.includes(movie.id))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].id
            const index = moviesData.map(movie => movie.id).indexOf(toBeRemoved)
            alreadyRemoved.push(toBeRemoved)
            debugger
            childRefs[index]?.current?.swipe(dir)
        }
    }


    return (
        <div className="App">
            <h1>Movie Tinder</h1>
            <div className='cardContainer'>
                {moviesState.map((movie, index) =>
                        <TinderCard ref={childRefs[index]} className='swipe'
                                    key={movie.id} onSwipe={(dir) => swiped(dir, movie.id)} onCardLeftScreen={() => outOfFrame(movie.id)}>
                            <div style={{backgroundImage: 'url(' + movie.imageURL + ')'}} className='card'>
                                <h3>{movie.title}</h3>
                            </div>

                        </TinderCard>
                )}
            </div>
            <div className='buttons' >
                <button className='button-reject' onClick={() => swipe('left')}>Reject</button>
                <button className='button-accept' onClick={() => swipe('right')}>Accept</button>
            </div>

            <h2 className='infoText'>Swipe a card to the left to reject and right to accept!</h2>
        </div>
    );
}

export default App;
