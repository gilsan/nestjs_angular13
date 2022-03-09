import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { InputboxComponent } from "./components/inputbox/inputbox.component";
import { TabPanelComponent } from "./components/tab-panel/tab-panel.component";


const routes: Routes = [
  { path: '', component: InputboxComponent },
  { path: 'tabs', component: TabPanelComponent },
  { path: 'inputbox', component: InputboxComponent },
  { path: '**', redirectTo: 'inputbox', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
