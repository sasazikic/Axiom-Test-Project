import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {

  }

  apiKey = environment.apiKey;
  baseUrl = environment.baseUrl;

  fetchCities(payload: any): Observable<any> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=bulk`;


    return this.http.post(url, payload)
  }

  getCity(city: string): Observable<any> {
    const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

    return this.http.get(url)
  }
}
