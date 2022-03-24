import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
@Component({
  selector: 'ngshop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async submit() {
    console.log(this.formGroup);
    try {
      await this.authService.login(this.formGroup.value);
      // this.modal.toggle();
      // this.messageService.add({ severity: 'success', summary: '로그인', detail: '로그인 되었습니다.' });
    } catch (e) {
      this.messageService.add({ severity: 'error', summary: '실패', detail: '로그인실패' });
      return;
    }
  }
}
