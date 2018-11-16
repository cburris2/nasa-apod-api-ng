import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApodResponse } from './apod-response';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  nasa_url = 'https://api.nasa.gov/planetary/apod?api_key=your_key_goes_here&count=10'

  constructor(private http_client: HttpClient) { }

  getAPODImage(): Observable<HttpResponse<ApodResponse[]>> {
    return this.http_client.get<ApodResponse[]>(this.nasa_url, { observe: 'response'});
  }
}
