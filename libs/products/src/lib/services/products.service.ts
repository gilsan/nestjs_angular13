import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IImage, IProduct, IReview } from "../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:3000/products';

  constructor(
    private http: HttpClient,
  ) { }

  getProducts(page: number, perPage: number): Observable<IProduct[]> {
    const params = new HttpParams()
      .set('sort', 'ASC')
      .set('page', page)
      .set('perPage', perPage);
    return this.http.get<IProduct[]>(`${this.url}/product/lists`, { params });
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/product/all`);
  }

  getCategory(id?: string): Observable<IProduct[]> {
    let params = new HttpParams();
    if (id) {
      params = params.append('category', id);
      return this.http.get<IProduct[]>(`${this.url}/product/category`, { params });
    }
    return of([]);
  }

  getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/product/list/${id}`)
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}/product/insert`, { ...product });
  }

  uploadImage(fd: FormData) {
    return this.http.post(`http://localhost:3000/file/upload`, fd);
  }



  updateProduct(product: IProduct, id: string): Observable<any> {
    return this.http.put(`${this.url}/product/update`, { ...product, id })
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/product/${id}`)
  }

  getFeaturedProduct(count: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/product/featured/${count}`)
  }

  ///////////////////////////////////////////////////////
  getImages(): Observable<IImage[]> {
    return this.http.get<IImage[]>(`${this.url}/image/lists`)
  }

  getImage(id: number): Observable<IImage> {
    return this.http.get<IImage>(`${this.url}/image/list/${id}`)
  }

  createImage(image: IImage): Observable<IImage> {
    return this.http.post<IImage>(`${this.url}/image/insert`, { ...image })
  }

  updateImage(image: IImage): Observable<any> {
    return this.http.put(`${this.url}/image/update`, { ...image })
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.url}/image/${id}`)
  }

  getProductImage(id: number): Observable<IImage[]> {
    return this.http.get<IImage[]>(`${this.url}/image/productid/${id}`);
  }

  ////////////////////////////////////////////////////////////////

  getReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.url}/review/lists`)
  }

  getReview(id: number): Observable<IReview> {
    return this.http.get<IReview>(`${this.url}/review/list/${id}`)
  }

  createReview(review: IReview): Observable<IReview> {
    return this.http.post<IReview>(`${this.url}/review/insert`, { ...review })
  }

  updateReview(review: IReview): Observable<any> {
    return this.http.put(`${this.url}/review/update`, { ...review })
  }

  getProductReview(id: string): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.url}/review/productid/${id}`);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.url}/review/${id}`)
  }



}
