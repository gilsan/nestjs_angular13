import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../components/models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  url = 'http://localhost:3000/orders';
  constructor(
    private http: HttpClient
  ) { }

  orderInsert(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.url}/order/insert`, { ...order });

  }


}
