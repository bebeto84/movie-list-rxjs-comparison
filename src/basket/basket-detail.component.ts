import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Movie } from '../movie.model';
import { CommonModule } from '@angular/common';
import { BasketElementComponent } from './basket-element.component';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  imports: [CommonModule, BasketElementComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BasketDetailComponent {
  @Input() basketItems: Movie[] = [];
  @Input() totalPrice: number = 0;
  @Output() removeMovie = new EventEmitter<Movie>();

  onRemove(movie: Movie): void {
    this.removeMovie.emit(movie);
  }
}
