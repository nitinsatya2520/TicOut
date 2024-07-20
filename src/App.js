import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Booking from './pages/Booking';
import BookingComplete from './components/BookingComplete';
import Confirmation from './pages/Confirmation';
import './App.css';
import Navbar from './components/Navbar';
import Events from './pages/Events';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/booking/:movieId" element={<Booking />} />
        <Route path="/confirmation" element={<BookingComplete />} />
        <Route path="/event" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
