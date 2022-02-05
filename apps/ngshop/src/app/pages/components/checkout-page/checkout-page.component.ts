import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '@ngshop/products';
import * as countries from 'i18n-iso-countries';
import { CartService } from '../../orders/cart.service';
import { IUser } from '../models/user.model';
import { SubSink } from 'subsink';
import { ItemOrder, Order } from '../models/order.model';
import { OrderProductService } from '../../orders/order.service';
import { from, map, switchMap } from 'rxjs';
import { CartItem, CartItemDetail } from '../models/cart.model';
import { Store } from '@ngrx/store';
import { UserEntityService } from '@ngshop/users';

declare const require: any;

@Component({
  selector: 'order-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    street: [''],
    apartment: [''],
    zipcode: [''],
    city: [''],
    country: ['']
  });

  userid = 0;
  isSubmitted = false;
  countries: { id: string, name: string }[] = [];
  private subs = new SubSink();
  grandTotal = 0;
  cartProducts: { product: number, quantity: number }[] = [];



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartService,
    private productsService: ProductsService,
    private orderProductService: OrderProductService,
    private store: Store,
    private userEntity: UserEntityService
  ) { }

  ngOnInit(): void {
    this._getCountryList();
    this.loadTotalPrice();
    this.userEntity.entities$
      .pipe(map(data => data[0]))
      .subscribe(data => {
        console.log(data);
        const {
          apartment, city, country, email, id, isAdmin,
          name, phone, passwordHash, street,
          token, zip,
        } = data;

        const info = {
          apartment, city, country, email, isAdmin,
          name, phone, street, zipcode: zip, zip
        }

        this.makeUser(info);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadTotalPrice() {
    this.cartService.cartObservable$.subscribe(products => {

      products.forEach(item => {
        this.cartProducts.push({
          product: item.productId!,
          quantity: item.quantity!
        })
      })

      console.log('[64]', this.cartProducts);
      products.forEach(list => {
        this.subs.sink = this.productsService.getProduct(list.productId?.toString()!)
          .subscribe(product => {
            if (product) {
              // console.log(product);
              this.grandTotal += (product.price! * list.quantity!);
            }
          });
      });
    })
  }


  backToCart() {
    this.router.navigate(['/cart']);
  }

  get userControl() {
    return this.form.controls;
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const customerInfo = this.form.getRawValue();
    console.log(customerInfo.name, customerInfo);

    const orderinfo: Order = {
      shippingAddress1: customerInfo.street,
      shippingAddress2: customerInfo.apartment,
      city: customerInfo.city,
      country: customerInfo.country,
      phone: customerInfo.phone,
      status: '주문',
      totalPrice: this.grandTotal,
      dateOrderedDate: this.today(),
      userid: this.userid,
      orderItem: this.cartProducts
    }

    this.orderProductService.orderInsert(orderinfo)
      .subscribe(data => {
        this.router.navigate(['/success']);
        this.cartService.emptyCartItem();
      });

  }

  makeUser(user: IUser) {
    this.form.setValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      street: user.street,
      apartment: user.apartment,
      zipcode: user.zip,
      city: user.city,
      country: user.country,

    });

  }



  _getCountryList() {
    countries.registerLocale(require("i18n-iso-countries/langs/ko.json"));
    this.countries = Object.entries(countries.getNames("ko", { select: "official" })).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });
  }



  today() {
    const today = new Date();
    const year = today.getFullYear(); // 년도
    const month = today.getMonth() + 1;  // 월
    const day = today.getDay() - 1;  // 요일
    const newmon = ('0' + month).substr(-2);
    const newday = ('0' + day).substr(-2);
    const now = year + '-' + newmon + '-' + newday;
    return now;
  }

}
