import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { ScreenComponent } from "./components/screen/screen.component";
import { HomeComponent } from "./home.component";


const routes: Routes = [
  {
    path: '', component: MainComponent,
  },
  {
    path: 'screen', component: ScreenComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
