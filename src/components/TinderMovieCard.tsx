import React from "react";
import {MovieType} from "../bll/movies-reducer";
import TinderCard from "react-tinder-card";

export type TinderMovieCardPropsType = {
    childRefs: React.RefObject<any>[]
    index: number
    onSwipe: (dir: string) => void
    onCardLeftScreen: () => void
    movie: MovieType
}

const TinderMovieCard = (props: TinderMovieCardPropsType) => {
    return <TinderCard ref={props.childRefs[props.index]} className="swipe"
                       onSwipe={props.onSwipe} onCardLeftScreen={props.onCardLeftScreen}>
        <div style={{backgroundImage: "url(" + props.movie.imageURL + ")"}} className="card">
            <h3>{props.movie.title}</h3>
        </div>

    </TinderCard>;
}

export default TinderMovieCard
