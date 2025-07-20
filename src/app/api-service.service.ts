// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
// import { ApodResponse } from './apod-response';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiServiceService {
//   private readonly nasaUrl =
//     'https://api.nasa.gov/planetary/apod?api_key=WZPWCE4iFL4PFQdR6KOYh64opP5k3LV6ki7cXjWj&count=2';

//   private readonly response$ = new BehaviorSubject<ApodResponse[]>([]);

//   constructor(private httpClient: HttpClient) {}

//   // Public method that returns an observable for the response
//   getApodImages(): Observable<ApodResponse[]> {
//     return this.httpClient.get<ApodResponse[]>(this.nasaUrl, { observe: 'response' }).pipe(
//       tap((resp) => {
//         // Emit the images in case we need to track the state internally
//         this.response$.next(resp.body ? resp.body : []);
//         console.log('APOD images fetched:', resp.body);
//       }),
//       map((resp) => resp.body ?? []), // Ensure we return only the response body
//       catchError((error) => {
//         // Handle error and return an empty array if the request fails
//         console.error('Error fetching APOD images', error);
//         return []; // or you could return an empty observable `of([])`
//       })
//     );
//   }

//   // Optional: Expose the internal state as an observable
//   get responseObservable(): Observable<ApodResponse[]> {
//     return this.response$.asObservable();
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApodResponse } from './apod-response';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private readonly nasaUrl =
    'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=2';

  constructor(private httpClient: HttpClient) {}

  // Returns the observable with the data in the correct format
  getApodImages(): Observable<ApodResponse[]> {
    return this.httpClient.get<ApodResponse[]>(this.nasaUrl).pipe(
      // Handle the response and return the body directly
      catchError(error => {
        console.error('Error fetching APOD images', error);
        return []; // Returning an empty array in case of an error
      })
    );
  }
}
