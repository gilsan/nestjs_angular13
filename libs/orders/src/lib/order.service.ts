import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Order, OrderItem } from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderLists$ = new Subject<Order>();
  listsObservable$: Observable<Order> = this.orderLists$.asObservable();


  url = 'http://localhost:3000/orders';
  constructor(
    private http: HttpClient
  ) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/order/all`);
  }

  getLists(page: number, perPage: number): Observable<Order[]> {
    const params = new HttpParams()
      .set('sort', 'ASC')
      .set('page', page)
      .set('perPage', perPage);
    const list$ = this.http.get<Order[]>(`${this.url}/order/lists`, { params });
    return list$;
  }

  getList(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.url}/order/list/${id}`)
  }


  orderInsert(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.url}/order/insert`, { ...order });

  }

  getOrderItemById(id: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.url}/orderitem/list/${id}`)
  }

  store(order: Order) {
    this.orderLists$.next(order);
  }

}
