import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { HeaderComponent } from './header/header.component';
import { BasketSummaryComponent } from './basket/basket-summary.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BasketDetailComponent } from './basket/basket-detail.component';
import { MovieListComponent } from './movie/movie-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    BasketDetailComponent,
    MovieListComponent,
    CommonModule,
  ],
  template: `<div class="app-layout">
  <!-- Header with Basket Summary -->
  <app-header [totalItems]="(basketItems$ | async)?.length ?? 0"
      [totalPrice]="(totalPrice$ | async) ?? 0"
    >

  </app-header>

  <!-- Sidebar with Basket Details -->
  <app-sidebar  
    [basketItems]="(basketItems$ | async) ?? []"
      [totalPrice]="(totalPrice$ | async) ?? 0"
      (removeMovie)="removeFromBasket($event)">

  </app-sidebar>

  <!-- Movie List -->
  <main class="main-content">
    <app-movie-list
      (addToBasket)="addToBasket($event)"
      (removeFromBasket)="removeFromBasket($event)"
    ></app-movie-list>
  </main>
</div>`,
  styles: `
.app-layout {
  display: flex;
  flex-direction: column; /* Ensure header is at the top */
  height: 100%; /* Full viewport height */
}

.header {
  position: absolute; /* Sticky to top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Make sure it stays on top of other elements */
  width: 100%; /* Full width */
  background-color: #f8f9fa; /* Background color */
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Optional shadow */
  display: flex;
  justify-content: space-between; /* Title on left, summary on right */
  align-items: center;
}

.content {
  display: flex;
  flex: 1; /* Take up remaining space */
  overflow: hidden; /* Prevent overflow */
}

.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  overflow-y: auto; /* Scrollable sidebar */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.main-content {
  flex: 1; /* Take up remaining space after sidebar */
  overflow-y: auto; /* Allow main content to scroll */
  padding: 20px;
  padding-left: 290px;
}`,
})
export class AppComponent {
  // Basket data
  basketItems$ = this.movieService.basket$; // Observable of basket items
  totalPrice$ = this.movieService.getTotalPrice(); // Observable for total price

  // Movies data
  movies$ = this.movieService.movies$;

  constructor(private movieService: MovieService) {}

  // Actions
  addToBasket(movie: Movie): void {
    this.movieService.addToBasket(movie);
  }

  removeFromBasket(movie: Movie): void {
    this.movieService.removeFromBasket(movie);
  }
}
