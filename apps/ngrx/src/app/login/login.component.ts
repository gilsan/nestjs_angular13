import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop, tap } from 'rxjs';
import { isAuth, loadCoursesSuccess, login } from '../home/state/courses.actions';
import { AppState } from '../home/state/courses.reducer';
import { AuthService } from '../services/auth.service';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.fb.group({
    email: ['jhhan@allaboutsip.co.kr', Validators.required],
    password: ['123456', Validators.required]
  });
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private courseService: CoursesService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  getCourses() {
    const courses$ = this.courseService.getLists()
      .pipe(
        tap(courses => {
          this.store.dispatch(loadCoursesSuccess({ courses: courses }))
        })
      ).subscribe(noop);
  }

  onSubmit() {
    this.isSubmitted = true;
    const email = this.loginFormGroup.get('email')?.value;
    const passwd = this.loginFormGroup.get('password')?.value;
    this.auth.login(email, passwd)
      .pipe(
        tap(data => {
          if (data.token) {
            this.store.dispatch(login({ token: data.token }));
            this.store.dispatch(isAuth({ isAuth: true }));
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            localStorage.setItem('token', data.token);
            // this.getCourses();
            this.router.navigate(['/courses', 'lists']);
          } else {
            alert('등록후 사용해 주십시요.');
          }

        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
        }
      });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
