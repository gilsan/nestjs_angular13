import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScreenComponent } from "./home/components/screen/screen.component";

import { HomeComponent } from "./home/home.component";



const routes: Routes = [
  {
    path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
