import {moviesReducer, MovieType, setMoviesAC} from "./movies-reducer";

test('correct movie data should be add', () => {
    let movie1 = [{
        id: "1and3011",
        imageURL: "/movie-tinder/images/inferno.jpg",
        title: "Inferno",
        summary: "Lorem ipsum....",
        rating: 5.3
    }];

    const startState: Array<MovieType> = [
        ]

    const endState = moviesReducer(startState, setMoviesAC(movie1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe("1and3011");
});
