import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Booking.css'; // Import advanced CSS file

const Booking = () => {
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [costPerSeat] = useState(60); // Example cost per seat
  const [movieTitle, setMovieTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieId) {
      setError('Invalid movie ID');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:5000/api/movie/${movieId}`)
      .then(response => {
        setMovieTitle(response.data.title);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setError('Error fetching movie details');
      });

    axios.get(`http://localhost:5000/api/booked-seats/${movieId}`)
      .then(response => {
        setSeats(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching booked seats:', error);
        setError('Error fetching booked seats');
        setLoading(false);
      });
  }, [movieId]);

  const handleSeatClick = (seat) => {
    if (seats.includes(seat)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat.');
      return;
    }

    axios.post('http://localhost:5000/api/book', { id: movieId, seats: selectedSeats })
      .then(response => {
        navigate('/confirmation', {
          state: {
            movieTitle,
            selectedSeats,
            numSeats: selectedSeats.length,
            totalCost: selectedSeats.length * costPerSeat
          }
        });
      })
      .catch(error => {
        console.error('Error booking seats:', error);
        setError('Error booking tickets');
      });
  };

  const totalCost = selectedSeats.length * costPerSeat;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="booking-container">
      <h1 className="booking-header">Book Seats for Movie {movieTitle}</h1>
      <h2 className='booking-header'>- - - - - - - - - - - - - - - - SCREEN - - - - - - - - - - - - - - - -</h2>
      <div className="seat-grid">
        {Array.from({ length: 25 }, (_, index) => {
          const seatNumber = index + 1;
          const isBooked = seats.includes(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);

          const seatClass = isSelected ? 'seat-button selected' : isBooked ? 'seat-button booked' : 'seat-button available';

          return (
            <button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              disabled={isBooked}
              className={seatClass}
              aria-label={`Seat ${seatNumber}`}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>
      <div className="total-cost">
        <p>Total Cost: ₹{totalCost}</p>
        <button onClick={handleBooking} className="book-button">
          Book Seats
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Booking;
