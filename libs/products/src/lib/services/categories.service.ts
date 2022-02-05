import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ICategory } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = 'http://localhost:3000/api/v1';

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.url}/categories`)
      .pipe(shareReplay())
  }

  getCategory(categoryId: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.url}/category/${categoryId}`);
  }

  createCategory(category: Partial<ICategory>): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.url}/category`, { ...category });
  }

  updateCategory(category: ICategory): Observable<any> {
    return this.http.put<ICategory>(`${this.url}/category/${category.id}`, { ...category });
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.url}/category/${categoryId}`);
  }



}
