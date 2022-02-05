import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@ngshop/products';
import * as countries from 'i18n-iso-countries';
import { MessageService } from 'primeng/api';


import { IUser } from '../../../models/users.model';

declare const require: any;

@Component({
  selector: 'ngshop-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  id = '';
  editMode = false;
  isSubmitted = false;
  countries: { id: string, name: string }[] = [];
  user: IUser = {
    email: ''
  };
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    isAdmin: [false],
    street: [''],
    apartment: [''],
    zip: [''],
    city: [''],
    country: [''],
    token: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userSerive: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this._checkEditMode();
    this._getCountryList();
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.editMode = true;
        this.userSerive.getUserById(params['id'])
          .subscribe(data => {
            this.makeUser(data);
          })
      }

    })
  }

  makeUser(user: IUser) {
    this.form.setValue({
      name: user.name,
      email: user.email,
      password: user.passwordHash,
      phone: user.phone,
      isAdmin: user.isAdmin,
      street: user.street,
      apartment: user.apartment,
      zip: user.zip,
      city: user.city,
      country: user.country,
      token: user.token
    });
    this.form.controls['password'].setValidators([]);
    this.form.controls['password'].updateValueAndValidity();
  }



  addNew() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const formdata = this.form.getRawValue();
    if (this.id) {
      const newFormdata = { id: this.id, ...formdata };

      this.userSerive.updateUser(newFormdata)
        .subscribe(data => {
          console.log('[갱신]', data);
          this.messageService.add({ key: 'updateKey', severity: 'success', summary: '갱신', detail: '갱신했습니다.' });
        })

    } else {
      console.log(formdata);
      this.userSerive.insertUser(formdata)
        .subscribe(data => {
          console.log('[신규]', data);
          this.form.reset();
          this.messageService.add({ key: 'insertKey', severity: 'success', summary: '입력', detail: '입력했습니다.' });
        });
    }



  }



  cancel() {
    this.router.navigate(['/users']);
  }

  _getCountryList() {
    countries.registerLocale(require("i18n-iso-countries/langs/ko.json"));
    this.countries = Object.entries(countries.getNames("ko", { select: "official" })).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });
  }

  get userControl() {
    return this.form.controls;
  }
}
