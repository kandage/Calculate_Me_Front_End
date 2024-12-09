import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WaterTankService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  calculateWaterTank(waterTankCalculationRequestDTO: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/water-tank/calculate', waterTankCalculationRequestDTO)
  }

  getAllPaginated(page: any, pageSize: any):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/water-tank/all?pageNo=' + page + '&size=' + pageSize)
  }
}
