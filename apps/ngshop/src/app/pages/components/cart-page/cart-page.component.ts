import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@ngshop/products';
import { MessageService } from 'primeng/api';
import { SubSink } from 'subsink';
import { CartService } from '../../orders/cart.service';
import { CartProduct } from '../models/cart.model';


@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  quantity = 1;
  cartCount = 0;
  cartProducts: CartProduct[] = [];
  count = 0;
  grandTotal = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productsService: ProductsService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this._getCartProduct();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private _getCartProduct() {
    const cartItems = this.cartService.getCartItem();

    this.count = cartItems?.length;
    cartItems?.forEach(list => {
      this.subs.sink = this.productsService.getProduct(list.productId?.toString()!)
        .subscribe(product => {
          if (product) {
            this.grandTotal += (product.price! * list.quantity!);
            this.cartProducts.push({
              id: product.id!,
              name: product.name!,
              price: product.price!,
              image: product.image!,
              quantity: list.quantity!,
              totalprice: product.price! * list.quantity!
            });
          }
        });
    });

    // this.cartService.cartObservable$.subscribe(products => {
    //   this.count = products.length;
    //   products.forEach(list => {
    //     this.subs.sink = this.productsService.getProduct(list.productId?.toString()!)
    //       .subscribe(product => {
    //         if (product) {
    //           this.grandTotal += (product.price! * list.quantity!);
    //           this.cartProducts.push({
    //             id: product.id!,
    //             name: product.name!,
    //             price: product.price!,
    //             image: product.image!,
    //             quantity: list.quantity!,
    //             totalprice: product.price! * list.quantity!
    //           });
    //         }
    //       });
    //   });
    // })
  }

  backToShow() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cart: CartProduct, i: number) {
    console.log(cart);
    const res = this.cartService.deleteCartItem(cart.id);
    if (res.result === 'SUCCESS') {
      const tempCart: CartProduct[] = this.cartProducts.filter(cartProduct => cartProduct.id !== cart.id);
      this.cartProducts = [];
      this.cartProducts = tempCart;
      this.messageService.add({ severity: 'success', summary: '실행결과', detail: '삭제 했습니다.', life: 2000 });
    }
  }

  changeQuantity(event: any, item: CartProduct, idx: number) {
    console.log(item);

    const res = this.cartService.setCartItem({
      productId: item.id,
      quantity: event.value
    }, true);
    if (res.result === 'SUCCESS') {
      this.grandTotal = 0;
      const totalprice = event.value * item.price;

      this.cartProducts[idx].totalprice = totalprice;
      this.cartProducts.forEach(list => {
        this.grandTotal += (list.price! * list.quantity!);
      });
    }

  }



}
