import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '@ngshop/orders';
import { UserService } from '@ngshop/products';
import { concatMap, from, map, switchMap } from 'rxjs';

@Component({
  selector: 'ngshop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders: Order[] = [];
  orderCount = 0;
  customerCount = 0;
  totalProductCount = 0;
  totalPrice = 0;
  totalQuantity = 0;
  constructor(
    private orderService: OrderService,
    private userSerive: UserService,
  ) { }

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
    this.orderService.getAllOrders()
      .pipe(
        switchMap(data => from(data)),
        concatMap((data) => {
          return this.userSerive.getUserById(data.userid!).pipe(
            map(user => {
              return { ...data, name: user.name }
            })
          );
        }),
        concatMap(list => {
          return this.orderService.getOrderItemById(list.id!).pipe(
            map(item => {
              return { ...list, items: item };
            })
          )
        }),
      )
      .subscribe(data => {
        console.log(data);
        this.orders.push(data);
        this.makeType(data);
      });
  }


  makeType(data: Order) {

    if (data.name!.length > 0) {
      this.orderCount++;
      this.customerCount++;
    }
    if (data.totalPrice) {
      this.totalPrice += data.totalPrice;
    }

    data.items?.forEach(list => {
      this.totalQuantity += list.quantity!;
    });
  }


}
