import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AirConditionerService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  calculateACSize(airConditionerRequestDTO: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/air-conditioner/calculate', airConditionerRequestDTO)
  }

  getAllPaginated(page: any, pageSize: any):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/air-conditioner/all?pageNo=' + page + '&size=' + pageSize)
  }
}
