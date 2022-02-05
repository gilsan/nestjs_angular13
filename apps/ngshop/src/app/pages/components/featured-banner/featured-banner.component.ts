import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct, ProductsService } from '@ngshop/products';
import { SubSink } from 'subsink';

@Component({
  selector: 'product-featured-banner',
  templateUrl: './featured-banner.component.html',
  styleUrls: ['./featured-banner.component.scss']
})
export class FeaturedBannerComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  products: IProduct[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getFeaturedProduct();
  }

  private _getFeaturedProduct() {
    this.subs.sink = this.productsService.getFeaturedProduct(4)
      .subscribe(products => {
        // console.log(products);
        this.products = products;
      })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
