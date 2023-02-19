import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisService } from '../movie-api';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favouriteMovies$ = this.apiService.getFavoriteList();
  delete(id: number) {
    console.log(id);
    this.apiService
      .deleteMovie(id)
      .subscribe(
        () => (this.favouriteMovies$ = this.apiService.getFavoriteList())
      );
  }
  constructor(private apiService: ApisService) {}

  ngOnInit(): void {}
}
