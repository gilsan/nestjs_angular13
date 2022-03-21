import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalComponent, TabContainerComponent, TabComponent],
  exports: [ModalComponent, TabContainerComponent, TabComponent],
})
export class SharedModule {}
