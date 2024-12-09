import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WoodFrameService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  calculateWoodFrame(woodFrameCalculationRequestDTO: any):Observable<any> {
    return this.http.post<any>(this.baseUrl+ '/wood-frame/calculate',woodFrameCalculationRequestDTO)
  }

  getAllPaginated(page: any, pageSize: any) {
    return this.http.get<any>(this.baseUrl + '/wood-frame/all?pageNo=' + page + '&size=' + pageSize)
  }
}
