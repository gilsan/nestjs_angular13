import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'ngshop-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]],
    age: [''],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    phoneNumber: [''],
  });

  constructor(private fb: FormBuilder, private messageService: MessageService, private authService: AuthService) {}

  ngOnInit(): void {}

  async submit() {
    console.log(this.formGroup);

    try {
      await this.authService.createUser(this.formGroup.value);
      this.messageService.add({ severity: 'success', summary: '등록', detail: '등록하였습니다.' });
    } catch (e) {
      console.error(e);
      this.messageService.add({ severity: 'error', summary: '실패', detail: '등록실패' });
      return;
    }
  }
}
