import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScreenComponent } from "./home/components/screen/screen.component";
import { RtcwindowComponent } from './home/components/rtcwindow/rtcwindow.component';
import { HomeComponent } from "./home/home.component";



const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  { path: 'screen', component: ScreenComponent },
  { path: 'window', component: RtcwindowComponent },
  { path: '**', redirectTo: '/home' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
