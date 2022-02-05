import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from '@ngshop/orders';
import { IUser, ProductsService, UserService } from '@ngshop/products';
import { BehaviorSubject, concatMap, from, map, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'ngshop-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {


  orders: Order[] = [];
  page = 1;
  pagePer = 2;
  order: Order = {
    orderItem: [
      { product: 7, quantity: 5 },
      { product: 8, quantity: 2 }
    ],
    shippingAddress1: '광진구 구의1동',
    shippingAddress2: '40-20 오거주택 201',
    city: '서울',
    country: '대한민국',
    phone: '010-3200-8000',
    status: '배송중',
    totalPrice: 7400,
    user: {
      id: 1,
      name: '금강산'
    },
    dateOrderedDate: '2022-01-12'
  }
  constructor(
    private orderService: OrderService,
    private userSerive: UserService,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.insertData();
    this.getLists(this.page, this.pagePer);
  }

  getLists(page: number, pagePer: number) {
    this.orderService.getLists(page, pagePer)
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
        this.orders.push(data);
      });
  }

  insertData() {
    this.orderService.orderInsert(this.order)
      .subscribe(data => {
        console.log(data);
      })
  }

  edit(order: Order) {
    this.orderService.store(order);
    this.router.navigate(['/orders', 'form', order.id]);
  }

  delete(order: Order) {

  }

  paginate(event: any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    const page = event.page + 1;
    const perPage = event.rows;
    console.log(event);
    this.orders = [];
    this.getLists(page, perPage);
  }

}
