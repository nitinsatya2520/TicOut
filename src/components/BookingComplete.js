import React from 'react';
import { useLocation } from 'react-router-dom';
import Confirmation from '../pages/Confirmation'; // Adjusted path

const BookingComplete = () => {
  const location = useLocation();
  const { movieTitle, numSeats, totalCost } = location.state || {};

  return (
    <Confirmation
      movieTitle={movieTitle}
      numSeats={numSeats}
      totalCost={totalCost}
    />
  );
};

export default BookingComplete;
