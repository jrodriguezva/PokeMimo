import axios from 'axios';

export const pokemonApi = axios.create();
export const cancelToken = axios.CancelToken;
