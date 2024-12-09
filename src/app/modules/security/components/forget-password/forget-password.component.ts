import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../share/services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  forgotPasswordForm = new FormGroup({
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/) // Adjust pattern for other formats if needed
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submitForgotPassword() {
    const mobile = this.forgotPasswordForm.get('mobile')?.value;
    if (mobile) {
      this.authService
        .forgotPassword(mobile)
        .pipe(first())
        .subscribe(
          () => {
            this.toastr.success('Recovery link sent to your mobile.', '', {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right',
            });
            this.router.navigate(['/security/login']);
          },
          error => {
            this.toastr.error('Failed to send recovery link.', '', {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-right',
            });
          }
        );
    }
  }

  goToLogin() {
    this.router.navigate(['/security/login']);
  }
}
