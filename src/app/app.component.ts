import { Component } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { BehaviorSubject } from 'rxjs';
import { ApodResponse } from './apod-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  response = new BehaviorSubject<ApodResponse[]>([]);
  headers = [];
  testArray = [];

  constructor(private apiService: ApiServiceService) {

      this.apiService.getAPODImage()
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        Object.keys(resp.body).forEach(key => 
          {
            this.response.next(resp.body[key]);
            this.testArray.push(resp.body[key]);
        });

      });

  }

}
