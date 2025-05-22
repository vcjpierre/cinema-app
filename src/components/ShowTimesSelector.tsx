import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock } from "lucide-react";
import type { ShowTime } from '../data/movies';

interface ShowTimesSelectorProps {
  movieId: number;
  showTimes: ShowTime[];
  onSelectTime: (showTimeId: number) => void;
  onBack: () => void;
}

const ShowTimesSelector: React.FC<ShowTimesSelectorProps> = ({
  movieId,
  showTimes,
  onSelectTime,
  onBack
}) => {
  const filteredShowTimes = showTimes.filter(showTime => showTime.movieId === movieId);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Horarios disponibles</span>
          <Button variant="outline" onClick={onBack}>Volver</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredShowTimes.map((showTime) => (
            <Button
              key={showTime.id}
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground"
              onClick={() => onSelectTime(showTime.id)}
            >
              <Clock className="h-5 w-5" />
              <span className="text-lg font-bold">{showTime.time}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowTimesSelector;
