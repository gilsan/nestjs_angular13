import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { TabComponent } from './tab/tab.component';
import { EventBlockerDirective } from './directives/enent-blocker.directive';
@NgModule({
  imports: [CommonModule],
  declarations: [ModalComponent, TabContainerComponent, TabComponent, EventBlockerDirective],
  exports: [ModalComponent, TabContainerComponent, TabComponent, EventBlockerDirective],
})
export class SharedModule {}
