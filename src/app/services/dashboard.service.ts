import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
    console.log(this.apiKey)
  }

  apiKey = environment.apiKey;
  baseUrl = environment.baseUrl;

  fetchData(payload: any): Observable<any> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=bulk`;


    return this.http.post(url, payload)
  }
}
