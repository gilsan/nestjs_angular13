import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IUser } from "../models/product.model";
import { Observable } from "rxjs";
import * as countries from 'i18n-iso-countries';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/users';
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/user/lists`);
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/user/list/${id}`);
  }

  insertUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/user/insert`, { ...user });
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.url}/user/update`, { ...user });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.get<IUser>(`${this.url}/user/delete/${id}`);
  }

  getCountry() {
    countries.registerLocale(require("i18n-iso-countries/langs/ko.json"));
    return Object.entries(countries.getNames("ko", { select: "official" })).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });

  }



}
