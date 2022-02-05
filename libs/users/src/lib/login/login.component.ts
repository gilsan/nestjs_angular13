import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserEntityService } from '../ngrx-data/user-entity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userEntity: UserEntityService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    const email = this.loginFormGroup.get('email')?.value;
    const passwd = this.loginFormGroup.get('password')?.value;
    const auth = { 'email': email, 'password': passwd };
    this.userEntity.getWithQuery(auth);
    this.auth.login(email, passwd)
      .subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            localStorage.setItem('token', data.token);
            this.router.navigate(['/home']);
          } else {
            alert('등록후 사용해 주십시요.');
          }

        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        }
      });
    // this.auth.userUpdate(email, passwd)
    //   .subscribe(data => {
    //     console.log(data);
    //   })
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
