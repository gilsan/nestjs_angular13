import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about/about.component';
import { HomeComponent } from './home/home.component';
import { AuthModalComponent } from './user/components/auth-modal/auth-modal.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthModalComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'movice', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
