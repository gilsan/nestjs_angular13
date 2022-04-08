import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test@gmail.com', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  register() {
    const { email, password } = this.form.value;
    this.authService
      .register(email, password)
      .pipe(
        tap((data) => {
          console.log(data);
          if (data.user) {
            this.router.navigate(['/home']);
          }
        })
      )
      .subscribe();
  }
}
