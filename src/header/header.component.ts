// header.component.ts
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasketSummaryComponent } from '../basket/basket-summary.component';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
  <header class="header">
  <div class="header-content">
    <h1>Movie Store</h1>
    <app-basket-summary 
      [totalItems]="totalItems"
      [totalPrice]="totalPrice"
    ></app-basket-summary>
  </div>
</header>`,
  styles: `
.header {
  display: flex;
  justify-content: space-between; /* Spread content between left and right */
  align-items: center;
}
.header-content {
  display: flex;
    width: 100%;
    justify-content: space-between;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
}
`,
  imports: [BasketSummaryComponent],
})
export class HeaderComponent {
  @Input() totalItems: number | null = 0;
  @Input() totalPrice: number | null = 0;
}
