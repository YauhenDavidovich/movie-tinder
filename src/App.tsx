import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {acceptMovieTC, fetchMoviesTC, MovieType, rejectMovieTC} from "./bll/movies-reducer";
import {AppRootStateType} from "./bll/store";
import TinderCard from 'react-tinder-card'



function App() {
    const alreadyRemoved = [] as Array<string>
    const dispatch = useDispatch();
    const movies = useSelector<AppRootStateType, Array<MovieType>>(state => state.movies)
    const childRefs = useMemo(() => Array(movies.length).fill(0).map(i => React.createRef<any>()), [movies])
    const [characters, setCharacters] = useState(movies)


    useEffect(() => {
        dispatch(fetchMoviesTC());
    }, [dispatch])

    useEffect(() => {
        setCharacters(movies);
    }, [movies])

    let charactersState = movies


    debugger



    const swiped = (direction: any, nameToDelete: string) => {
        alreadyRemoved.push(nameToDelete)
        {
            direction === "right" || "left" ? rejectMovieTC(nameToDelete) : acceptMovieTC(nameToDelete)
        }
    }
    const outOfFrame = (title:string) => {

        charactersState = charactersState.filter(character => character.title !== title)
        setCharacters(charactersState)
    }
    const swipe = (dir: string) => {
        debugger

        const cardsLeft = characters.filter(movie => !alreadyRemoved.includes(movie.title))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].title // Find the card object to be removed
            const index = movies.map(movie => movie.title).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            debugger
            // {dir === "right"? rejectMovieTC(nameToDelete): acceptMovieTC(nameToDelete)}

            childRefs[index]?.current?.swipe(dir) // Swipe the card!
        }
    }


    return (
        <div className="App">
            <h1>Movie Tinder</h1>
            <div className='cardContainer'>
                {charactersState.map((movie, index) =>

                        <TinderCard ref={childRefs[index]} className='swipe'
                                    key={movie.id} onSwipe={(dir) => swiped(dir, movie.title)} onCardLeftScreen={() => outOfFrame(movie.title)}>
                            <div style={{backgroundImage: 'url(' + movie.imageURL + ')'}} className='card'>
                                <h3>{movie.title}</h3>
                            </div>
                            <div className='buttons'>
                                <button className='button-reject' onClick={() => swipe('left')}>Reject</button>
                                <button className='button-accept' onClick={() => swipe('right')}>Accept</button>
                            </div>
                        </TinderCard>
                )}
            </div>

            <h2 className='infoText'>Swipe a card to the left to reject and right to accept!</h2>
        </div>
    );
}

export default App;
