import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Confirmation.css'; // Import advanced CSS file

const Confirmation = () => {
  const location = useLocation();
  const { movieTitle, numSeats, totalCost, selectedSeats } = location.state || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-header">Booking Confirmed!</h1>
      <p>Thank you for booking your tickets. Enjoy the movie!</p>
      <div className="confirmation-details">
        <h2>Booking Details</h2>
        <p><strong>Movie:</strong> {movieTitle}</p>
        <p><strong>Number of Seats:</strong> {numSeats}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
        <p><strong>Total Cost:</strong> ₹{totalCost}</p>
      </div>
      <div className="confirmation-actions">
        <Link to="/" className="back-home-button">
          Back to Home
        </Link>
        <button onClick={handlePrint} className="print-button">
          Print Ticket
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
