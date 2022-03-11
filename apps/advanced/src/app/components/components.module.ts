import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabComponent } from './tab/tab.component';
import { InputboxComponent } from './inputbox/inputbox.component';
import { AuFaInputComponent } from './au-fa-input/au-fa-input.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './component/progress-bar/progress-bar.component';
import { CountdownComponent } from './component/countdown/countdown.component';
import { ComponentHandleComponent } from './component-handle/component-handle.component';
import { ComponentClockComponent } from './component-clock/component-clock.component';
import { TimerComponent } from './advanceComponent/timer/timer.component';
import { TabsComponentComponent } from './advanceComponent/tabs/tabs.component';
import { TabComponentComponent } from './advanceComponent/tab/tab.component';
import { SimpleAlertViewComponent } from './advanceComponent/simple-alert-view/simple-alert-view.component';
import { DisplayComponent } from './advanceComponent/display/display.component';
import { AlertViewComponent } from './advanceComponent/alert-view/alert-view.component';



@NgModule({
  declarations: [
    TabsComponent,
    TabPanelComponent,
    TabComponent,
    InputboxComponent,
    AuFaInputComponent,
    ProgressBarComponent,
    CountdownComponent,
    ComponentHandleComponent,
    ComponentClockComponent,
    TimerComponent,
    TabsComponentComponent,
    TabComponentComponent,
    SimpleAlertViewComponent,
    DisplayComponent,
    AlertViewComponent

  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
