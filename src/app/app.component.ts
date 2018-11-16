import { Component } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { BehaviorSubject, Observable } from '../../node_modules/rxjs';
import { ApodResponse } from './apod-response';
import { HttpResponse } from '../../node_modules/@angular/common/http/src/response';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nasa-apod-api';
  response = new BehaviorSubject<ApodResponse[]>([]);
  headers = []
  dates = []
  count = 5
  testArray = []

  constructor(private apiService: ApiServiceService) {

      this.apiService.getAPODImage()
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        // this.response = { ... resp.body };
   
        //this.dates.push(this.response.date);
        Object.keys(resp.body).forEach(key => 
          {
            this.response.next(resp.body[key]);
            this.testArray.push(resp.body[key]);
        });

        

        //console.log(resp)
      });
     
    //console.log(this.response)
      this.getHD_Image()
     //this.response
    //console.log(this.response[0])
    console.log(this.testArray)

    
  }

  getHD_Image() {
    console.log(this.response)

    // this.response.forEach((elem) => {
    //   console.log(elem.keys())
    // })
    
    return this.dates
  }


}
