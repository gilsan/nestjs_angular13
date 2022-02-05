import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@ngshop/products';
import { CartService } from '../../orders/cart.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ngshop-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  providers: []
})
export class ProductItemComponent implements OnInit {

  @Input() product: IProduct | undefined;
  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
  }

  addProductToCart(product: IProduct) {

    const msg = this.cartService.setCartItem({ productId: product.id, quantity: 1 });
    console.log();
    if (msg.result === 'SUCCESS') {
      this.messageService.add({ severity: 'success', summary: '실행결과', detail: '추가 했습니다.', life: 2000 });
    } else {
      this.messageService.add({ severity: 'error', summary: '실행결과', detail: '추가 하지 못했습니다.', life: 2000 });
    }
  }

}
