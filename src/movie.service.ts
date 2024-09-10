// movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Movie } from './movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=9eecc30ae89f253bce3cec4140734493';

  private _moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ = this._moviesSubject.asObservable(); // Observable stream for the movie list

  private _basketSubject = new BehaviorSubject<Movie[]>([]);
  basket$ = this._basketSubject.asObservable(); // Observable stream for the basket

  constructor(private http: HttpClient) {}

  loadMovies(page: number): void {
    this.http
      .get<any>(`${this.baseUrl}&page=${page}`)
      .pipe(
        map((data) =>
          data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            price: Math.floor(Math.random() * 20) + 5, // Random price for movies
            originalPrice: Math.floor(Math.random() * 20) + 5, // Store the original price
          }))
        )
      )
      .subscribe((movies: Movie[]) => {
        firstValueFrom(this.movies$).then((currentMovies) => {
          this._moviesSubject.next([...currentMovies, ...movies]); // Append new movies to the existing ones
        });
      });
  }

  // Add a movie to the basket and DECREASE its price by 0.5%
  addToBasket(newMovie: Movie): void {
    firstValueFrom(this.basket$).then((currentBasket) => {
      const isAlreadyInBasket = currentBasket.find(
        (movie) => movie.id === newMovie.id
      );

      if (!isAlreadyInBasket) {
        // Add the new movie to the basket
        const updatedBasket = [...currentBasket, newMovie];

        // Calculate discount (0.5% per movie in the basket)
        const discountFactor = 1 - updatedBasket.length * 0.005; // Discount = 0.5% * number of movies

        // Update the prices of all movies in the basket with the new discount
        const updatedMoviesInBasket = updatedBasket.map((movie) => ({
          ...movie,
          price: movie.originalPrice * discountFactor,
        }));

        // Update the basket with the updated prices
        this._basketSubject.next(updatedMoviesInBasket);

        // Update global movie list with the discounted prices for the movies in the basket
        this.updateMoviesInListWithDiscount(updatedMoviesInBasket);
      }
    });
  }

  // Remove a movie from the basket and REVERT its price to original
  removeFromBasket(movieToRemove: Movie): void {
    firstValueFrom(this.basket$).then((currentBasket) => {
      const updatedBasket = currentBasket.filter(
        (movie) => movie.id !== movieToRemove.id
      );

      // Calculate discount (0.5% per movie in the basket)
      const discountFactor = 1 - updatedBasket.length * 0.005;

      // Update the prices of all remaining movies in the basket with the new discount
      const updatedMoviesInBasket = updatedBasket.map((movie) => ({
        ...movie,
        price: movie.originalPrice * discountFactor,
      }));

      // Update the basket with the updated prices
      this._basketSubject.next(updatedMoviesInBasket);

      // Update global movie list with the discounted prices for the movies in the basket
      this.updateMoviesInListWithDiscount(updatedMoviesInBasket);
    });
  }
  private updateMoviesInListWithDiscount(updatedMoviesInBasket: Movie[]): void {
    firstValueFrom(this.movies$).then((currentMovies) => {
      const updatedMovies = currentMovies.map((movie) => {
        const basketMovie = updatedMoviesInBasket.find(
          (basketMovie) => basketMovie.id === movie.id
        );
        if (basketMovie) {
          return { ...movie, price: basketMovie.price }; // Apply the discounted price
        }
        return movie;
      });

      // Update the global movie list
      this._moviesSubject.next(updatedMovies);
    });
  }

  getTotalDiscount(): Observable<number> {
    return this.basket$.pipe(
      map((basket) => {
        return basket.reduce((totalDiscount, movie) => {
          const discount = movie.originalPrice - movie.price;
          return totalDiscount + discount;
        }, 0);
      })
    );
  }

  // Get the total price of the basket
  getTotalPrice(): Observable<number> {
    return this.basket$.pipe(
      map((basket) => basket.reduce((sum, movie) => sum + movie.price, 0)),
      startWith(0)
    );
  }

  // Check if a movie is in the basket
  isMovieInBasket(movieId: number): Observable<boolean> {
    return this.basket$.pipe(
      map((basket) => !!basket.find((movie) => movie.id === movieId))
    );
  }
}
