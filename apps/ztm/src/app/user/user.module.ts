import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [AuthModalComponent],
  exports: [AuthModalComponent],
})
export class UserModule {}
