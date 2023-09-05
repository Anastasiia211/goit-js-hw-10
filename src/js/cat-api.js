import axios from "axios";
const URL = 'https://api.thecatapi.com/v1';

const fetchBreeds = () => {
    const point = '/breeds';

    return axios.get(`${URL}${point}`)
};

const fetchCatByBreed = breedId => {
    const point = '/images/search';

    const params = new URLSearchParams({
        breed_ids: breedId,
    });

    return axios.get(`${URL}${point}?${params}`)
};

export { fetchBreeds, fetchCatByBreed };




