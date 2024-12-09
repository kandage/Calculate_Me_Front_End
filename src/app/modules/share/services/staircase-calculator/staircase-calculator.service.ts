import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaircaseCalculatorService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  calculateStairCase(stairCaseRequestDTO: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/staircase-calculator/calculate', stairCaseRequestDTO)
  }

  getAllPaginated(page: any, pageSize: any) {
    return this.http.get<any>(this.baseUrl + '/staircase-calculator/all?pageNo=' + page + '&size=' + pageSize)
  }
}
