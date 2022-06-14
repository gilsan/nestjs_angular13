import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { catchError, from, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private afa: AngularFireAuth, private router: Router) {
    this.isLoggedIn$ = afa.authState.pipe(
    //  tap((data) => console.log('authState:', data)),
      map((data) => !!data)
    );
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((data) => !data));
  }

  register(email: string, password: string): Observable<any> {
    return from(this.afa.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afa.signInWithEmailAndPassword(email, password)).pipe(
      catchError((err) => {
        this.router.navigate(['/create-user']);
        return throwError(() => new Error('err'));
      })
    );
  }

  signOut() {
    this.afa.signOut().then(() => {
        this.router.navigate(['/sbook']);
    });
  }

  logout(): Observable<any> {
    return from(this.afa.signOut());
  }

  currentUser(): Promise<any> {
    return this.afa.currentUser;
  }
}
