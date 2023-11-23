import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SerpAPIService {

  constructor(private http : HttpClient) { }

  fetchLoadAuditData(param:any ) {
    console.log(param,"paramd")
    return this.http
      .post<any>(`https://azurecontainerqna.azurewebsites.net/inferencing/question_response`,param,
      {
        headers: {
          'content-type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
      })
      .pipe(
        tap((response) => {
           if (response.statusCode == 200) {
           response
           }
        })
      );
  }
}
