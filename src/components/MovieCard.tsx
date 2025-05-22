import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, Film } from "lucide-react";

interface MovieCardProps {
  id: number;
  title: string;
  genre: string;
  duration: string;
  image: string;
  description: string;
  onSelectMovie: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  genre,
  duration,
  image,
  description,
  onSelectMovie
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {genre}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {duration}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onSelectMovie(id)}
        >
          <Film className="mr-2 h-4 w-4" />
          Ver horarios
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
