import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '../movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'movie-details.component.html',
  styles: [
    `
      .movie-details {
        margin-bottom: 10px;
      }

      h3 {
        font-size: 18px;
        margin: 0 0 10px 0;
      }

      p {
        font-size: 14px;
        margin: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent {
  @Input() movie!: Movie;
}
