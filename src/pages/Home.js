import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-header">Welcome to TicOut</h1>
      <p className="home-intro">Discover the latest movies, events and book your tickets online easily.</p>
      <Link to="/movies">
        <button className="home-button">View Movies</button>
      </Link>
      <Link to="/event">
      <button className="home-button">View Events</button>
      </Link>
    </div>
  );
};

export default Home;
