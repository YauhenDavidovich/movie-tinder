import axios from "axios";

const instance = axios.create({
    baseURL:
        './data.json',
});

export const moviesAPI = {
    getMovies() {
        return instance.get<MovieType[]>('');
    },

};

export interface MovieType {
    id:       string;
    imageURL: string;
    title:    string;
    summary:  string;
    rating:   number;
}
