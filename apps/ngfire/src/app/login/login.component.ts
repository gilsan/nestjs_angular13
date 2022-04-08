import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadAuthUI();
  }

  ngOnDestroy(): void {
    this.ui.delete();
  }

  loadAuthUI() {
    this.afAuth.app.then((app) => {
      const uiConfig = {
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
        },
      };

      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start('#firebase-auth-container', uiConfig);
      this.ui.disableAutoSignIn();
    });
  }

  onLoginSuccessful(result) {
    console.log('Firebase UI result: ', result);
    this.router.navigate(['/courses']);
  }

  loadForm() {
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
