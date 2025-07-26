import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { ApodResponse } from './apod-response';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private readonly nasaUrl =
    'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=2';

  constructor() {}

  // Returns the observable with the data in the correct format
  async getApodImages(): Promise<ApodResponse[]> {
    const data = await fetch(this.nasaUrl);
    // const json = await data.json();
    // console.log('Fetched data:', json); // Log the fetched data for inspection
    // Ensure the data is in the correct format
    return (await data.json()) ?? [];
  }

  }