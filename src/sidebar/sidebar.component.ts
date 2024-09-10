import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Movie } from '../movie.model';
import { BasketDetailComponent } from '../basket/basket-detail.component';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
  <aside class="sidebar">
    <app-basket-detail
      [basketItems]="basketItems"
      [totalPrice]="totalPrice"
      (removeMovie)="onRemoveMovie($event)"
    ></app-basket-detail>
  </aside>`,
  imports: [BasketDetailComponent],
  styles: [
    `
    .sidebar {
  position: fixed;
  top: 10vh; /* Below the header */
  left: 0;
  width: 250px;
  height: 90vh; /* Fills remaining space */
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

    `,
  ],
})
export class SidebarComponent {
  @Input() basketItems: Movie[] = [];
  @Input() totalPrice: number = 0;

  @Output() removeMovie = new EventEmitter<Movie>();

  // Emit the event to the parent when a movie is removed
  onRemoveMovie(movie: Movie): void {
    this.removeMovie.emit(movie);
  }
}
