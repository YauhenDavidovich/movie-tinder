import {acceptMoviesAC, moviesReducer, MovieType, rejectMoviesAC, setMoviesAC} from "./movies-reducer";

test('correct movie data should be add', () => {
    let movie1 = [{
        id: "1and3011",
        imageURL: "/movie-tinder/images/inferno.jpg",
        title: "Inferno",
        summary: "Lorem ipsum....",
        rating: 5.3
    }];

    const startState: Array<MovieType> = []

    const endState = moviesReducer(startState, setMoviesAC(movie1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe("1and3011");
});


let movies = [{
    id: "1and3011",
    imageURL: "/movie-tinder/images/inferno.jpg",
    title: "Inferno",
    summary: "Lorem ipsum....",
    rating: 5.3
},
    {
        id: "1and3012",
        imageURL: "/movie-tinder/images/batman.jpg",
        title: "Batman",
        summary: "Lorem ipsum....",
        rating: 8.3
    },];

test('film should be removed from state after accepting', () => {


    const startState: Array<MovieType> = movies

    const endState = moviesReducer(startState, acceptMoviesAC("1and3012"))

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("Inferno");
});

test('film should be removed from state after rejecting', () => {

    const startState: Array<MovieType> = movies

    const endState = moviesReducer(startState, rejectMoviesAC("1and3011"))

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("Batman");
});
