import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test@gmail.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  login() {
    const { email, password } = this.form.value;
    this.authService
      .login(email, password)
      .pipe(
        tap((data) => {
          if (data.user) {
            this.router.navigate(['/home']);
          }
        })
      )
      .subscribe((data) => {});
  }
}
