async function getMovies() {
    try {
        let response =  await fetch('/movie-tinder/data.json');
        return await  response.json();

    } catch (error) {
        console.error(error);
    }
}

export default getMovies


