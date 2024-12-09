import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlooringCalculatorService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  calculateFlooring(flooringRequestDTO: any):Observable<any> {
    return this.http.post<any>(this.baseUrl+ '/flooring-calculator/calculate',flooringRequestDTO)
  }

  getAllPaginated(page: any, pageSize: any):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/flooring-calculator/all?pageNo=' + page + '&size=' + pageSize)
  }
}
