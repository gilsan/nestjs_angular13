import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     SharedModule],
  declarations: [AuthModalComponent, LoginComponent, RegisterComponent],
  exports: [AuthModalComponent],
})
export class UserModule {}
