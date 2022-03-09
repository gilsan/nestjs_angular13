import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabComponent } from './tab/tab.component';
import { InputboxComponent } from './inputbox/inputbox.component';
import { AuFaInputComponent } from './au-fa-input/au-fa-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TabsComponent,
    TabPanelComponent,
    TabComponent,
    InputboxComponent,
    AuFaInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
