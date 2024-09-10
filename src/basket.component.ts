// basket.component.ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieService } from './movie.service';
import { Movie } from './movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class BasketComponent {
  basket$: Observable<Movie[]>; // Observable stream of movies in the basket
  totalPrice$: Observable<number>; // Observable for the total price
  totalDiscount$: Observable<number>; // Observable for the total discount

  constructor(private movieService: MovieService) {
    this.basket$ = this.movieService.basket$; // Subscribe to the basket
    this.totalPrice$ = this.movieService.getTotalPrice(); // Subscribe to the total price
    this.totalDiscount$ = this.movieService.getTotalDiscount(); // Subscribe to the total discount
  }

  // Remove a movie from the basket
  removeFromBasket(movie: Movie): void {
    this.movieService.removeFromBasket(movie);
  }
}
