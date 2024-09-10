// movie-list.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { MovieService } from './movie.service';
import { Observable } from 'rxjs';
import { Movie } from './movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>; // Observable stream of movies
  page = 1;

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movies$; // Stream of movies from the service
    this.loadMovies(); // Load the first page
  }

  ngOnInit(): void {}

  loadMovies(): void {
    this.movieService.loadMovies(this.page); // Triggers movie loading
  }

  addToBasket(movie: Movie): void {
    this.movieService.addToBasket(movie); // Call service method to add movie
  }

  removeFromBasket(movie: Movie): void {
    this.movieService.removeFromBasket(movie); // Call service method to remove movie
  }

  isMovieInBasket(movieId: number): Observable<boolean> {
    return this.movieService.isMovieInBasket(movieId); // Returns an Observable<boolean>
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++;
      this.loadMovies();
    }
  }
}
