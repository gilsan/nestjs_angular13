import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '@ngshop/products';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { openDialog } from './alart-dialog/alert-dialog.component';
import { filter } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories: ICategory[] = [];
  categoryColumns: string[] = ['name', 'icon', 'color', 'quantity', 'editdelete'];

  private subs = new SubSink();

  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  edit(row: ICategory) {
    this.router.navigate(['categories', 'form', row.id]);
  }

  delete(id: string) {
    this.subs.sink = openDialog(this.dialog)
      .pipe(
        filter(val => !!val)
      )
      .subscribe(data => {
        // console.log(data);
        if (data.message === 'OK') {
          this.categoriesService.deleteCategory(id)
            .subscribe(data => {
              this.snackBar.open('삭제 했습니다.', '닫기', { duration: 3000 });
            })
        }
      });
  }

}
