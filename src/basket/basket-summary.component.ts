import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  styles: `
  .basket-summary {
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 16px;
}`,
})
export class BasketSummaryComponent {
  @Input() totalItems: number | null = 0;
  @Input() totalPrice: number | null = 0;
}
