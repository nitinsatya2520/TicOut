import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Movies.css';

const FAST_FILLING_THRESHOLD = 9; // Define the threshold for fast filling

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => {
        const moviesWithSeatsPromises = response.data.map(movie => 
          axios.get(`http://localhost:5000/api/available-seats/${movie.id}`)
            .then(seatsResponse => ({
              ...movie,
              availableSeats: seatsResponse.data.availableSeats
            }))
            .catch(error => {
              console.error(`Error fetching available seats for movie ${movie.id}:`, error);
              return { ...movie, availableSeats: null }; // Handle error case
            })
        );

        Promise.all(moviesWithSeatsPromises)
          .then(moviesWithSeats => setMovies(moviesWithSeats))
          .catch(error => console.error('Error fetching movies with seats:', error));
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  return (
    <div className="movies-container">
      <h1 className="movies-header">Movies</h1>
      <ul className="movies-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-item">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
            <p className="movie-duration">Duration: {movie.duration}</p>
            {movie.availableSeats !== null && movie.availableSeats < FAST_FILLING_THRESHOLD && (
              <p className="fast-filling">Fast Filling!</p>
            )}
            <Link to={`/booking/${movie.id}`}>
              <button className="movie-button">Book Now</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
