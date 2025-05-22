export interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  image: string;
  description: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "El Último Viaje",
    genre: "Ciencia Ficción",
    duration: "2h 15min",
    image: "/movie1.jpg",
    description: "Un astronauta en su última misión descubre un secreto que podría cambiar el futuro de la humanidad."
  },
  {
    id: 2,
    title: "Corazones de Acero",
    genre: "Acción",
    duration: "1h 55min",
    image: "/movie2.jpg",
    description: "En medio de una guerra, un grupo de soldados debe enfrentar sus miedos más profundos."
  },
  {
    id: 3,
    title: "Sueños de Primavera",
    genre: "Drama",
    duration: "2h 05min",
    image: "/movie3.jpg",
    description: "Una historia conmovedora sobre la búsqueda de la felicidad en los pequeños momentos de la vida."
  },
  {
    id: 4,
    title: "La Última Risa",
    genre: "Comedia",
    duration: "1h 45min",
    image: "/movie4.jpg",
    description: "Un comediante retirado decide volver a los escenarios para un último espectáculo."
  }
];

export interface ShowTime {
  id: number;
  time: string;
  movieId: number;
}

export const showTimes: ShowTime[] = [
  { id: 1, time: "10:00", movieId: 1 },
  { id: 2, time: "13:30", movieId: 1 },
  { id: 3, time: "16:45", movieId: 1 },
  { id: 4, time: "20:15", movieId: 1 },
  { id: 5, time: "11:15", movieId: 2 },
  { id: 6, time: "14:30", movieId: 2 },
  { id: 7, time: "17:45", movieId: 2 },
  { id: 8, time: "21:00", movieId: 2 },
  { id: 9, time: "10:30", movieId: 3 },
  { id: 10, time: "13:45", movieId: 3 },
  { id: 11, time: "17:00", movieId: 3 },
  { id: 12, time: "20:30", movieId: 3 },
  { id: 13, time: "12:00", movieId: 4 },
  { id: 14, time: "15:15", movieId: 4 },
  { id: 15, time: "18:30", movieId: 4 },
  { id: 16, time: "21:45", movieId: 4 }
];

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'occupied' | 'selected';
}

export const generateSeats = (rows: number, seatsPerRow: number): Seat[] => {
  const seats: Seat[] = [];
  const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, rows);

  for (let i = 0; i < rowLetters.length; i++) {
    const row = rowLetters[i];
    for (let j = 1; j <= seatsPerRow; j++) {
      // Generar algunos asientos ocupados aleatoriamente
      const randomStatus = Math.random() < 0.3 ? 'occupied' : 'available';
      seats.push({
        id: `${row}${j}`,
        row,
        number: j,
        status: randomStatus
      });
    }
  }

  return seats;
};
