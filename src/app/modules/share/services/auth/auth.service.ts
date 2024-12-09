import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  login(email: string, password: string) {
    return this.http.get<any>(this.baseUrl + '/user/details?email=' + email + '&password=' + password);
  }

  signup(email: string, fullName: string, mobile: string, password: string) {
    return this.http.post<any>(this.baseUrl + '/user/save', {
      userFullName: fullName,
      userEmail: email,
      userMobile: mobile,
      password: password
    });
  }

  forgotPassword(mobile: string) {
    return this.http.post<any>(this.baseUrl + '/user/forgot-password?mobileNumber=' + mobile, {});
  }
}
