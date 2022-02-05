import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategoriesService, ICategory } from '@ngshop/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';


@Component({
  selector: 'ngshop-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  isSubmitted = false;
  editMode = true;
  id = '';
  private subs = new SubSink();

  form: FormGroup = this.fb.group({
    name: [, [Validators.required]],
    icon: ['', [Validators.required]],
    color: []
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private _checkEditMode() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.editMode = false;
        this.categoriesService.getCategory(params['id'])
          .subscribe(data => {
            this.createCategory(data);
          })

      }
    })
  }

  createCategory(category: ICategory) {
    console.log(category.name, category);
    this.form.setValue({
      name: category.name,
      icon: category.icon,
      color: category.color
    });

  }

  add() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      alert('빈항목을 입력해 주십시요.');
      return;
    }
    console.log(this.form.getRawValue());
    const val = this.form.getRawValue();
    const category = {

      name: val.name,
      icon: val.icon,
      color: val.color
    }
    this.subs.sink = this.categoriesService.createCategory(category)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.snackBar.open('저장 했습니다.', '닫기', { duration: 3000 });
        }
      });
  }

  update() {
    const { name, icon, color } = this.form.getRawValue();
    const category = { id: this.id, name, icon, color };
    console.log(category);
    this.subs.sink = this.categoriesService.updateCategory(category)
      .subscribe(data => {
        console.log('[UPDATE] ', data);
      })
  }

  cancel() {
    this.location.back();
  }

  get categoryForm() {
    return this.form.contains;
  }

  formCategory(): FormGroup {
    return this.form as FormGroup;
  }

}
