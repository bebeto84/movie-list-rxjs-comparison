import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-movie-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `<div class="movie-actions">
  <button *ngIf="!isInBasket" (click)="onAdd()">Add to Basket</button>
  <button *ngIf="isInBasket" (click)="onRemove()">Remove from Basket</button>
</div>`,
  imports: [NgIf],
  styles: `.movie-actions {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  
    button {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  }`,
})
export class MovieActionsComponent {
  @Input() isInBasket: boolean = false;
  @Output() addToBasket = new EventEmitter<void>();
  @Output() removeFromBasket = new EventEmitter<void>();

  onAdd(): void {
    this.addToBasket.emit();
  }

  onRemove(): void {
    this.removeFromBasket.emit();
  }
}
