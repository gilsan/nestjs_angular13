import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'order-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @Input() totalPrice = 0;
  @Input() marginTop = 0;

  isCheckout = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.url.includes('checkout') ? this.isCheckout = true : this.isCheckout = false;
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

}
