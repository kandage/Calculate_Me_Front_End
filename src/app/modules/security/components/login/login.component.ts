import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../share/services/auth/auth.service";
import {first} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {SnackBarService} from "../../../share/services/snack-bar/snack-bar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  passwordState: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  login() {
    this.authService.login(
      this.loginForm.get('email')?.value!,
      this.loginForm.get('password')?.value!
    ).pipe(first())
      .subscribe(
        data => {
          if (data?.code === 200) {
            sessionStorage.setItem("userFullName", data?.data?.userFullName);
            sessionStorage.setItem("userEmail", data?. data?.userEmail);
            sessionStorage.setItem("userMobile", data?.data?.userMobile);
            this.snackBarService.openSuccessSnackBar('Successfully login','close')
          } else {
            this.snackBarService.openErrorSnackBar('Authentication Failed','close')
            this.loginForm.reset();
          }
          if (sessionStorage.getItem('userFullName') && sessionStorage.getItem('userEmail') && sessionStorage.getItem('userMobile')) {
            this.router.navigateByUrl('/process').then()
          }

        }, error => {
          this.snackBarService.openErrorSnackBar('An error has occurred, please try again later','close')
        });
  }

  forgotPassword() {
    this.router.navigateByUrl('/security/forget-password').then()
  }
}
