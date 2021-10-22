import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchMoviesTC, MovieType} from "./bll/movies-reducer";
import {AppRootStateType} from "./bll/store";

function App() {
  const dispatch = useDispatch();
  const movies = useSelector<AppRootStateType, Array<MovieType>>(state => state.movies)


  useEffect(() => {
    console.log("dsf")
    dispatch(fetchMoviesTC());
  }, [dispatch])

  return (
    <div className="App">
      {movies.map(mv => {
        return <div>{mv.id}</div>})}
    </div>
  );
}

export default App;
