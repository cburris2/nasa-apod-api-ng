import { Component, inject } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { ApodResponse } from './apod-response';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [JsonPipe]
})
export class AppComponent {
  private readonly apiService = inject(ApiServiceService);

  // Expose the observable directly to the template
  response$ = this.apiService.getApodImages();
  // headers$ = this.apiService.responseObservable;
  testArray: ApodResponse[] = [];

  constructor() {

    // Optionally, you can handle any logic if needed when the service response changes
    this.response$.subscribe({
        next: (data) => {
          console.log('Received data:', data);  // Log data for inspection
          this.testArray = [...data];
          console.log('Test array updated:', this.testArray);  // Log the updated test array
        },
        error: (err) => {
          console.error('Error:', err);  // Log errors if any
        },
        complete: () => {
          console.log('Data fetch complete');  // Log when the observable completes
        }
    });
  }
}
