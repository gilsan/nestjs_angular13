import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILoginForm, IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
    this.userCollection = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(map((data) => !!data));
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error(' 비밀번호가 없습니다.');
    }

    const cred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);
    if (!cred.user) {
      throw new Error('등록된 사용자가 없습니다.');
    }
    console.log(cred);
    // cred.user['displayName'] = userData.name;
    await this.userCollection.doc(cred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await cred.user.updateProfile({
      displayName: userData.name,
    });

    return cred;
  }

  async login(form: ILoginForm) {
    const cred = await this.auth.signInWithEmailAndPassword(form.email, form.password);

    return cred;
  }

  async logout() {
    await this.auth.signOut();
    // await this.afauth.signOut();
    await this.router.navigate(['/']);
  }
}
