import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, ICategory, ProductsService } from '@ngshop/products';
import { IProduct } from 'libs/products/src/lib/models/product.model';
import { map, Observable, startWith } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'ngshop-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  isSubmited = false;
  editMode = true;
  products: IProduct[] = [];
  categoryBuffer: { id: string, name: string } = { id: '', name: '' };
  selectedFile: File = {} as File;
  form: FormGroup = this.fb.group({
    image: ['', [Validators.required]],
    name: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    price: ['', [Validators.required]],
    countInStock: [''],
    category: [''],
    isFeatured: [false],
    description: [''],
    richDescription: [''],
    dateCreated: [''],
    imagefile: ['']
  });

  imageDisplay: string | ArrayBuffer = '';
  filteredOptions: Observable<{ id: string, name: string }[]> = this.formProduct().controls['category'].valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value)),
  );

  options: { id: string, name: string }[] = [];
  id: string = '';
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private http: HttpClient,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this._getCategoryLists();
    this._checkEditMode();
  }

  private _getCategoryLists() {

    this.categoriesService.getCategories()
      .subscribe(data => {
        data.forEach(item => {
          this.options.push({ id: item.id, name: item.name })
        })
      })
  }

  private _filter(value: string): { id: string, name: string }[] {
    return this.options.filter(option => option.name.includes(value));

  }

  selectedItem(item: { id: string, name: string }) {
    this.categoryBuffer = item;

  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.editMode = true;
        this.productService.getProduct(this.id)
          .subscribe(data => {
            console.log(data);
            const tempid = data.id;

            this.createProduct(data);
          })
      }
    })
  }


  createProduct(product: IProduct) {
    this.imageDisplay = product.image;
    this.form.setValue({
      image: product.image,
      name: product.name,
      brand: product.brand,
      price: product.price,
      countInStock: product.countInStock,
      category: product.category,
      isFeatured: product.isFeatured,
      description: product.description,
      richDescription: product.richDescription,
      dateCreated: product.dateCreated,
      imagefile: ''
    });
  }

  add() {
    this.isSubmited = true;
    if (this.form.invalid) {
      console.log(this.form, this.isSubmited);
      return;
    }

    const productData = new FormData();
    const val = this.form.controls;
    const value = this.form.getRawValue();
    console.log(value);

    Object.keys(val).map(key => {
      productData.append(key, val[key].value);
    });
    productData.append('category', this.categoryBuffer.id);

    const fd = new FormData();
    fd.append('imagefile', this.selectedFile, this.selectedFile.name);

    // this.productService.uploadImage(fd)
    //   .subscribe(data => {
    //     console.log(data);
    //   });
    // this.productService.createProduct(value)
    //   .subscribe(data => {
    //     console.log(data);
    //   });

    // productData.forEach(item => {
    //   // console.log(item);
    // });

  }

  update() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    const productData = new FormData();
    const val = this.form.controls;
    const { imagefile, ...value } = this.form.getRawValue();
    console.log(value);

    // const fd = new FormData();
    // fd.append('imagefile', this.selectedFile, this.selectedFile.name);

    // this.productService.uploadImage(fd)
    //   .subscribe(data => {
    //     console.log(data);
    //   });

    this.productService.updateProduct(value, this.id)
      .subscribe(data => {
        console.log('[update]', data);
      });
  }

  cancel() {
    this.router.navigate(['/products']);
  }

  formProduct(): FormGroup {
    return this.form as FormGroup;
  }
  onImageFileUpload(event: any) {
    const file = event.target.files[0];
    const filename = event.target.files[0].name;
    this.selectedFile = <File>event.target.files[0];
    const fileRead = new FileReader();

    if (file) {
      this.form.patchValue({ imagefile: file });
      this.form.get('imagefile')?.updateValueAndValidity();
      this.form.patchValue({ image: filename });
      this.form.get('image')?.updateValueAndValidity();
      this.form.patchValue({ dateCreated: this.today() });

      fileRead.onload = (e) => {
        this.imageDisplay = fileRead.result!;
      }
      fileRead.readAsDataURL(file);
    }
  }

  today(): string {

    const oneMonthsAgo = moment();
    const yy = oneMonthsAgo.format('YYYY');
    const mm = oneMonthsAgo.format('MM');
    const dd = oneMonthsAgo.format('DD');
    const now1 = yy + '-' + mm + '-' + dd;
    return now1;
  }

  get productForm() {
    return this.form.controls;
  }

}
