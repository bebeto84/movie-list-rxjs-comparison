import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Movie } from '../movie.model';
import { MovieActionsComponent } from './movie-actions.component';
import { MovieDetailsComponent } from './movie-details.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-element',
  imports: [MovieActionsComponent, MovieDetailsComponent, NgClass, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `<div  class="movie-card"
  [ngClass]="{ 'in-basket': isMovieInBasket() | async }">
    <img [src]="movie.poster_path" alt="{{ movie.title }}" class="movie-image" />
  <app-movie-details [movie]="movie"></app-movie-details>
  <app-movie-actions
  [isInBasket]= "(isMovieInBasket() | async) ?? false "
    (addToBasket)="onAddToBasket()"
    (removeFromBasket)="onRemoveFromBasket()"
  ></app-movie-actions>
</div>`,
  styles: `
  .movie-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}
.movie-image {
  width: 100px;
  height: 155px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;



}
.in-basket {
  background-color: #f0f9ff; /* Light blue background */
  border-color: #007bff;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
}`,
})
export class MovieElementComponent {
  @Input() movie!: Movie;
  @Output() addToBasket = new EventEmitter<Movie>();
  @Output() removeFromBasket = new EventEmitter<Movie>();

  constructor(private movieService: MovieService) {}
  isMovieInBasket(): Observable<boolean> {
    return this.movieService.isMovieInBasket(this.movie.id); // Returns an Observable<boolean>
  }
  onAddToBasket(): void {
    this.addToBasket.emit(this.movie); // Emit the correct movie object
  }

  onRemoveFromBasket(): void {
    this.removeFromBasket.emit(this.movie); // Emit the correct movie object
  }
}
