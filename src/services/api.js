import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-api-url', // Replace with your backend API URL
});

export const fetchMovies = () => api.get('/movies');
export const bookTickets = (movieId, seats) => api.post('/book', { movieId, seats });
