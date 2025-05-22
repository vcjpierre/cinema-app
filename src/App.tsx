import { useState } from 'react';
import MovieCard from './components/MovieCard';
import ShowTimesSelector from './components/ShowTimesSelector';
import SeatSelector from './components/SeatSelector';
import { Button } from './components/ui/button';
import { generateSeats, movies, showTimes, type Movie, type Seat, type ShowTime } from './data/movies';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);
  const [seats, setSeats] = useState<Seat[]>(generateSeats(8, 10));
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleSelectMovie = (movieId: number) => {
    const movie = movies.find(m => m.id === movieId) || null;
    setSelectedMovie(movie);
    setSelectedShowTime(null);
    setSelectedSeats([]);
    setBookingComplete(false);
  };

  const handleSelectTime = (showTimeId: number) => {
    const showTime = showTimes.find(st => st.id === showTimeId) || null;
    setSelectedShowTime(showTime);
    // Generar nuevos asientos aleatorios para cada horario
    setSeats(generateSeats(8, 10));
    setSelectedSeats([]);
    setBookingComplete(false);
  };

  const handleSelectSeat = (seatId: string) => {
    setSeats(prevSeats =>
      prevSeats.map(seat => {
        if (seat.id === seatId) {
          const newStatus = seat.status === 'selected' ? 'available' : 'selected';
          return { ...seat, status: newStatus };
        }
        return seat;
      })
    );

    setSelectedSeats(prevSelected => {
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter(id => id !== seatId);
      } else {
        return [...prevSelected, seatId];
      }
    });
  };

  const handleConfirmSelection = () => {
    setBookingComplete(true);
  };

  const handleReset = () => {
    setSelectedMovie(null);
    setSelectedShowTime(null);
    setSelectedSeats([]);
    setBookingComplete(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-primary-foreground py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">CinePlus</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {bookingComplete ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">¡Reserva completada!</h2>
            <p className="mb-6">
              Has reservado {selectedSeats.length} asiento(s) para ver <span className="font-semibold">{selectedMovie?.title}</span> a las {selectedShowTime?.time}.
            </p>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Asientos seleccionados:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedSeats.map(seatId => (
                  <span key={seatId} className="bg-primary/10 text-primary px-2 py-1 rounded-md">
                    {seatId}
                  </span>
                ))}
              </div>
            </div>
            <Button onClick={handleReset}>Realizar otra reserva</Button>
          </div>
        ) : selectedShowTime ? (
          <SeatSelector
            seats={seats}
            onSelectSeat={handleSelectSeat}
            onConfirmSelection={handleConfirmSelection}
            onBack={() => setSelectedShowTime(null)}
          />
        ) : selectedMovie ? (
          <ShowTimesSelector
            movieId={selectedMovie.id}
            showTimes={showTimes}
            onSelectTime={handleSelectTime}
            onBack={() => setSelectedMovie(null)}
          />
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center">Películas en cartelera</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {movies.map(movie => (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  onSelectMovie={handleSelectMovie}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
