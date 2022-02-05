import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { map, Observable, tap } from "rxjs";
import { User } from "../user.model";

@Injectable()
export class UserDataService extends DefaultDataService<User> {

  url = 'http://localhost:3000/users';
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Course', http, httpUrlGenerator);
  }

  override getWithQuery(auth: { email: string, password: string }): Observable<User[]> {
    const params = new HttpParams()
      .set('email', auth.email)
      .set('password', auth.password);
    return this.http.get<User[]>(`${this.url}/user/info`, { params });
  }



}
