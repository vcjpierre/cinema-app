import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from '../lib/utils';
import type { Seat } from '../data/movies';

interface SeatSelectorProps {
  seats: Seat[];
  onSelectSeat: (seatId: string) => void;
  onConfirmSelection: (selectedSeats: string[]) => void;
  onBack: () => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({
  seats,
  onSelectSeat,
  onConfirmSelection,
  onBack
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Agrupar asientos por fila
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  // Ordenar filas alfabéticamente
  const rows = Object.keys(seatsByRow).sort();

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;

    const seatId = seat.id;
    let newSelectedSeats;

    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      newSelectedSeats = [...selectedSeats, seatId];
    }

    setSelectedSeats(newSelectedSeats);
    onSelectSeat(seatId);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Selección de asientos</span>
          <Button variant="outline" onClick={onBack}>Volver</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-8">
          <div className="w-3/4 h-8 bg-gray-300 rounded-t-lg mb-8 flex items-center justify-center text-sm font-medium">
            PANTALLA
          </div>

          <div className="grid gap-6 mb-6">
            {rows.map(row => (
              <div key={row} className="flex items-center gap-2">
                <div className="w-6 text-center font-bold">{row}</div>
                <div className="flex gap-2">
                  {seatsByRow[row].sort((a, b) => a.number - b.number).map(seat => (
                    <button
                      key={seat.id}
                      className={cn(
                        "w-8 h-8 rounded-t-lg text-xs font-medium transition-colors",
                        seat.status === 'available' && !selectedSeats.includes(seat.id) && "bg-green-500 hover:bg-green-600",
                        seat.status === 'occupied' && "bg-gray-500 cursor-not-allowed",
                        selectedSeats.includes(seat.id) && "bg-blue-500 hover:bg-blue-600"
                      )}
                      disabled={seat.status === 'occupied'}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-8 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-t-sm"></div>
              <span className="text-sm">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-t-sm"></div>
              <span className="text-sm">Seleccionado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 rounded-t-sm"></div>
              <span className="text-sm">Ocupado</span>
            </div>
          </div>

          <Button
            className="w-full max-w-xs"
            disabled={selectedSeats.length === 0}
            onClick={() => onConfirmSelection(selectedSeats)}
          >
            Confirmar selección ({selectedSeats.length} {selectedSeats.length === 1 ? 'asiento' : 'asientos'})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatSelector;
