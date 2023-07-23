import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '72775dd1327e5fbf35ce05cb6a563f92';

export const getMovieList = async () => {
  const page = 1; 
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting movie list:', error);
    return null;
  }
};

export const getMovieDetail = async (movieId:number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting movie detail:', error);
    return null;
  }
};
