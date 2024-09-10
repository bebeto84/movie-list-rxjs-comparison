import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { MovieListComponent } from './movie-list.component'; // Import the MovieListComponent
import { BasketComponent } from './basket.component'; // Import the BasketComponent
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app-main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent, BasketComponent], // Import necessary modules and components
  template: `
    <div class="app-container">
      <app-basket class="wallet-container"></app-basket>
      <div class="content-container">
        <h1>Movie Store</h1>
        <app-movie-list></app-movie-list>
      </div>
    </div>
  `,
  styles: [
    `
    .app-container {
      display: flex;
      height: 100vh;
    }
    .wallet-container {
      width: 20%;
      background-color: #f8f9fa;
      padding: 20px;
    }
    .content-container {
      width: 80%;
      padding: 20px;
    }
  `,
  ],
})
export class App {
  name = 'Angular Movie Store';
}

// Bootstrap the main application
bootstrapApplication(AppComponent, { providers: [provideHttpClient()] });
