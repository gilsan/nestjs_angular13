import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductsService } from '@ngshop/products';
import { MessageService } from 'primeng/api';
import { concatMap, filter, map, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { CartService } from '../../orders/cart.service';
import { CartItem } from '../models/cart.model';

@Component({
  selector: 'ngshop-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  product: IProduct = {
    name: '',
    description: '',
    rating: 2,
    price: 0
  };

  quantity = 1;
  images: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.route.params
      .pipe(
        filter(val => !!val),
        concatMap(data => {
          return this.productsService.getProduct(data['id'])
            .pipe(
              map(data => {
                return { id: data['id'], product: data }
              })
            );
        }),
        concatMap(product => {
          return this.productsService.getProductImage(product.id!)
            .pipe(
              map(data => {
                return { ...product, images: data };
              })
            )
        })

      )
      .subscribe(product => {

        this.product = product.product;
        product.images.forEach(item => {
          this.images.push(item.image);
        });
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  addProductToCart() {
    const cart: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    const msg = this.cartService.setCartItem(cart);
    if (msg.result === 'SUCCESS') {
      this.messageService.add({ severity: 'success', summary: '실행결과', detail: '추가 했습니다.', life: 2000 });
    } else {
      console.log('fail');
    }
  }



}
