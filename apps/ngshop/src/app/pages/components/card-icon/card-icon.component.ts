import { Component, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs';
import { CartService } from '../../orders/cart.service';

@Component({
  selector: 'order-card-icon',
  templateUrl: './card-icon.component.html',
  styleUrls: ['./card-icon.component.scss']
})
export class CardIconComponent implements OnInit {

  cartCount = '0';
  constructor(
    private cardService: CartService
  ) { }

  ngOnInit(): void {
    // this.cartCount = this.cardService.getCartItem().length.toString();
    this.cardService.cartObservable$
      .pipe(
        filter(data => !!data)
      )
      .subscribe(data => {
        if (data) {
          this.cartCount = data.length.toString();
        }

      });
  }

  cartStatus(): boolean {
    if (parseInt(this.cartCount, 10) > 0) {
      return true
    }
    alert('장바구니가 비었습니다.');
    return false;
  }

}
