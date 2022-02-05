import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000/users';
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/user/login`, { info: { email, password } });
  }

  userUpdate(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/user/update`, { info: { email, password } });
  }

  refresh(email: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.url}/user/refresh`, { info: { email } });
  }



}
