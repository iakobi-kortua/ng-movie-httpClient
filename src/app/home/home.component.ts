import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { ApisService } from '../movie-api';
import { Movie } from '../movie.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  search = new FormControl();

  movie$: Observable<Movie | null> | undefined;

  constructor(private apiService: ApisService) {}

  add(movie: Movie) {
    this.apiService.addToFavourite(movie).subscribe((x) => console.log(x));
  }

  ngOnInit(): void {
    this.movie$ = this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((x) => {
        if (x.length >= 1) {
          return this.apiService.getMovie(x);
        }
        return of(null);
      })
    );
  }
}
