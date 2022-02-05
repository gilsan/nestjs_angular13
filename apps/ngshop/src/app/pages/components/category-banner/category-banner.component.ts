import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '@ngshop/products';
import { SubSink } from 'subsink';


@Component({
  selector: 'product-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.scss']
})
export class CategoryBannerComponent implements OnInit, OnDestroy {

  categories: ICategory[] = [];
  private subs = new SubSink();

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategoryLists();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getCategoryLists() {
    this.subs.sink = this.categoriesService.getCategories().subscribe(lists => {
      // console.log(lists);
      this.categories = lists;
    });
  }

}
