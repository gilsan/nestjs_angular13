import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentClockComponent } from "./components/component-clock/component-clock.component";
import { ComponentHandleComponent } from "./components/component-handle/component-handle.component";
import { InputboxComponent } from "./components/inputbox/inputbox.component";
import { TabPanelComponent } from "./components/tab-panel/tab-panel.component";


const routes: Routes = [
  { path: '', component: ComponentHandleComponent },
  { path: 'component', component: ComponentClockComponent },
  { path: 'advance', component: ComponentHandleComponent },
  { path: 'tabs', component: TabPanelComponent },
  { path: 'inputbox', component: InputboxComponent },
  { path: '**', redirectTo: 'advance', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
