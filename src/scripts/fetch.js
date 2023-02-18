import axios from 'axios';
import {
  BASE_URL,
  API_KEY,
  search_point,
  discover_point,
  genre_point,
  trailer_point,
} from './api';

async function fetchPopularFilm(currentPage = 1) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${discover_point}?api_key=${API_KEY}&page=${currentPage}&sort_by=popularity.desc`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchSearchFilm(query, currentPage = 1) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${search_point}?api_key=${API_KEY}&page=${currentPage}&query=${query}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchGenre() {
  try {
    const response = await axios.get(
      `${BASE_URL}/${genre_point}?api_key=${API_KEY}`
    );
    localStorage.setItem('genres', JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
}

async function fetchMovie(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchTrailerFilm(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/${trailer_point}/${id}/videos?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export {
  fetchSearchFilm,
  fetchGenre,
  fetchPopularFilm,
  fetchMovie,
  fetchTrailerFilm,
};
