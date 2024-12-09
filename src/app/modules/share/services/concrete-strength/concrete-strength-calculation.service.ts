import { Injectable } from '@angular/core';  // Make sure this line is added
import { HttpClient } from '@angular/common/http';  // HttpClient import for making API calls
import { Observable } from 'rxjs';
import {environment} from "../../../../../environments/environment";  // For Observable return type

@Injectable({
  providedIn: 'root'
})
export class ConcreteStrengthCalculationService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  calculateConcreteStrength(concreteStrengthRequest: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/concrete-strength/predict`, concreteStrengthRequest);
  }

  getAllPaginated(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/concrete-strength/get-data`);
  }
}
