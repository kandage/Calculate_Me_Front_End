import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SolarPanelCalculatorService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  calculateSolarPanels(solarPanelCalculationDTO: any):Observable<any> {
    return this.http.post<any>(this.baseUrl+ '/solar-calculator/calculate',solarPanelCalculationDTO)
  }

  getAllPaginated(page: any, pageSize: any):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/solar-calculator/all?pageNo=' + page + '&size=' + pageSize)
  }
}
