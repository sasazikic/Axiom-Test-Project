import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentInjector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) {

  }

  apiKey = environment.apiKeyNinja;
  baseUrl = environment.baseUrlNinja;
  cityLimit = 50;


  fetchCities(): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey)
    const url = `${this.baseUrl}?min_population=50000&limit=${this.cityLimit}`;


    return this.http.get(url, {headers})
  }

}
