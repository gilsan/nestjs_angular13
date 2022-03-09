import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabComponent } from './tab/tab.component';
import { InputboxComponent } from './inputbox/inputbox.component';



@NgModule({
  declarations: [
    TabsComponent,
    TabPanelComponent,
    TabComponent,
    InputboxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
