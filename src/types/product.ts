export interface IFilm {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  plot: string;
  genres: [];
  tmdbRating: number;
  trailerYouTubeId: string;
  runtime: string;
  posterUrl: string;
  backdropUrl: string;
}
export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}
