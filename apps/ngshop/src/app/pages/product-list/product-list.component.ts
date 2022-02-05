import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ICategory, IProduct, ProductsService } from '@ngshop/products';
import { SubSink } from 'subsink';

@Component({
  selector: 'ngshop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  products: IProduct[] = [];
  tempProducts: IProduct[] = [];
  categories: ICategory[] = [];
  checked: boolean = false;
  isCategory: boolean = false;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      if (param['categoryid']) {
        const id = param['categoryid'];
        this.isCategory = true;
        console.log(id);
        this.subs.sink = this.productsService.getCategory(id)
          .subscribe(products => {
            this.products = products;
          });
      } else {
        this.isCategory = false;
        this._getAllProducts();
        this._getCategoryLists();
      }

    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  private _loadRoute() {
    this.route.params.subscribe(param => {
      if (param['categoryid']) {
        const id = param['categoryid'];
        console.log(id);
      }

    });
  }

  private _getAllProducts() {
    this.subs.sink = this.productsService.getAllProducts()
      .subscribe(products => {
        this.tempProducts = products;
        this.products = products;
      })
  }

  private _getProduct(id: string) {
    this.productsService.getProduct(id);
  }
  private _getCategoryLists() {
    this.subs.sink = this.categoriesService.getCategories().subscribe(lists => {
      this.categories = lists;
    });
  }

  categoryList() {
    this.products = [];
    const filtered = this.categories.filter(category => category.checked === true);

    filtered.forEach(item => {
      this.subs.sink = this.productsService.getCategory(item.id)
        .subscribe(products => {
          this.products = [...this.products, ...products];
        });
    });

  }

}
