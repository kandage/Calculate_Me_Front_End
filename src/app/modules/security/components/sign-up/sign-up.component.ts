import {Component} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SnackBarService} from "../../../share/services/snack-bar/snack-bar.service";
import {AuthService} from "../../../share/services/auth/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  passwordState: boolean = false;
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private authService: AuthService,
  ) {
  }

  trigger() {
    this.value = 0;
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    let data = this.signupForm.get('password')?.value!;

    if (strongPasswordRegex.test(data.toString())) {
      this.value = 100;
      this.color = "primary";
    } else {
      this.value = 20;
      this.color = "warn";
    }

  }

  signup() {
    if (!this.signupForm.get('email')?.value?.trim()) {
      this.snackBarService.openWarningSnackBar('please insert a valid email', 'close');
      return;
    }

    this.authService.signup(
      this.signupForm.get('email')?.value!,
      this.signupForm.get('name')?.value!,
      this.signupForm.get('mobile')?.value!,
      this.signupForm.get('password')?.value!
    ).subscribe(
      (data) => {
        if (data?.code === 200) {
          this.snackBarService.openErrorSnackBar('Registered Successfully!', 'close')
          this.router.navigateByUrl('/security/login').then();
        } else {
          this.snackBarService.openErrorSnackBar('Registration Faild!', 'close');
        }
      });
  }
}
