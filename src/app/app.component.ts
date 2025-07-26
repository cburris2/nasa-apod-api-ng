import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { AsyncPipe, JsonPipe, NgIf, NgFor } from '@angular/common';
import { ApodResponse } from './apod-response';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  // Inline template here:
  template: `
    <div class="container py-4">
      <h1 class="mb-4 text-center">{{ title }}</h1>

      <div class="row" *ngIf="response.length > 0; else loading">
        <div class="col-md-6 mb-4" *ngFor="let item of response">
          <div class="card h-100 shadow-sm">
            <ng-container *ngIf="item.media_type === 'image'; else notImage">
              <img [src]="item.hdurl || item.url" class="card-img-top" [alt]="item.title" />
            </ng-container>

            <ng-template #notImage>
              <div class="card-img-top d-flex align-items-center justify-content-center bg-light" style="height: 200px;">
                <p class="text-muted">Unsupported media type: {{ item.media_type }}</p>
              </div>
            </ng-template>

            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.explanation }}</p>
            </div>

            <div class="card-footer text-muted">
              <small>Date: {{ item.date }}</small>
            </div>
          </div>
        </div>
      </div>

      <ng-template #loading>
        <div class="text-center">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-3">Loading NASA images...</p>
        </div>
      </ng-template>
    </div>
  `,
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe],
})
export class AppComponent implements OnInit {
  title = 'NASA APOD API';
  response: ApodResponse[] = [];

  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getApodImages()
      .then(data => {
        this.response = data;
        console.log('Response updated:', this.response);
      })
      .catch(error => {
        console.error('Error fetching APOD images:', error);
      });
  }
}
