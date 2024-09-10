import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Movie } from '../movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket-element',
  templateUrl: './basket-element.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class BasketElementComponent {
  @Input() movie!: Movie;
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}
