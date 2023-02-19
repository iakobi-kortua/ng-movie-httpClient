import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie.module';

const API_BASE = 'https://www.omdbapi.com/?apikey=378d8bf3&t=';
const jsonServer = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  constructor(private http: HttpClient) {}

  getMovie(movieName: string): Observable<Movie> {
    return this.http.get<Movie>(`${API_BASE}${movieName}`);
  }

  getFavoriteList(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${jsonServer}/favourite`);
  }

  addToFavourite(movie: Movie) {
    return this.http.post(`${jsonServer}/favourite`, movie);
  }

  deleteMovie(id: number) {
    return this.http.delete(`${jsonServer}/favourite/${id}`);
  }
}
