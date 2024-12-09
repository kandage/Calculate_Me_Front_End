import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AntiTermiteService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  calculateAndSaveAntiTermite(antiTermiteRequestDTO: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/anti-termite-calculator/calculate', antiTermiteRequestDTO)
  }

  getAllPaginated(page: any, pageSize: any):Observable<any> {
    return this.http.get<any>(this.baseUrl + '/anti-termite-calculator/all?pageNo=' + page + '&size=' + pageSize)
  }
}
