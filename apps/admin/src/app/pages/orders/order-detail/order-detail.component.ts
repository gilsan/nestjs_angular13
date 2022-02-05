
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderItem, OrderService } from '@ngshop/orders';
import { CategoriesService, ICategory, IProduct, ProductsService, UserService } from '@ngshop/products';
import {
  concatMap, delay, from, map, takeLast,
  Observable, switchMap, tap, combineLatest
} from 'rxjs';

@Component({
  selector: 'ngshop-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order: Order = { id: '' };
  categoryLists: ICategory[] = [];
  orderProducts: { order: OrderItem, product: IProduct }[] = [];

  constructor(
    private orderService: OrderService,
    private userSerive: UserService,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this._loadOrderData();
    this._getOrderData();
  }
  _loadOrderData() {
    this.orderService.listsObservable$
      .pipe(
        tap(data => this.order = data)
      )
      .subscribe((data: Order) => {
        // this.order = { ...data };
        // console.log(this.order, this.order.id);
      });
  }

  _getOrderData() {
    let tempOrders: any[] = [];
    this.route.params.subscribe(params => {
      if (params['id']) {
        const product$ = this.orderService.getList(params['id'])
          .pipe(
            switchMap(data => from([data])),
            concatMap((data) => {
              return this.userSerive.getUserById(data.userid!).pipe(
                map(user => {
                  return { ...data, user }
                })
              );
            }),
            concatMap(list => {
              return this.orderService.getOrderItemById(list.id!).pipe(
                switchMap(items => from(items)),
                concatMap((order) => {
                  return this.productService.getProduct(order.product!.toString()).pipe(
                    map(product => {
                      tempOrders.push({ order, product });
                      return { ...list, orderItem: tempOrders }
                    })
                  )
                }),
              )
            }),
            takeLast(1)
          );

        const category$ = this.categoriesService.getCategories();

        combineLatest([product$, category$])
          .subscribe(([product, category]) => {
            this.order = product;
            this.categoryLists = category;
            this.orderProducts = product.orderItem;
            console.log('[제품]', product);
            console.log('[category]', category);
            console.log('[주문제품]', this.orderProducts);
          })

      }
    })
  }

  getCategoryName(idx: number): string {
    const category = parseInt(this.orderProducts[idx].product.category, 10);
    return this.categoryLists.filter(item => parseInt(item.id, 10) === category)[0].name;
  }

}
