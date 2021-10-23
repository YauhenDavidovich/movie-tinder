import axios from "axios";

const instance = axios.create({
    baseURL:
        'https://localhost:8080/recommendations/'
});


export const recomendationsAPI = {
    accept(id: string) {
        return instance.put(`/${id}/accept`)},
    reject(id: string) {
        return instance.put(`/${id}/reject`)},
};
