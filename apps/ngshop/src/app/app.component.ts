import { Component, OnInit } from '@angular/core';
import { CartService } from './pages/orders/cart.service';


@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private cartService: CartService,

  ) {
    cartService.initCartLocalStorage();
  }

  ngOnInit(): void {

  }
}
