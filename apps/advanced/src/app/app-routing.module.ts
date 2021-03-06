import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentClockComponent } from './components/component-clock/component-clock.component';
import { ComponentHandleComponent } from './components/component-handle/component-handle.component';
import { InputboxComponent } from './components/inputbox/inputbox.component';
import { TabPanelComponent } from './components/tab-panel/tab-panel.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./movice/movice.module').then((m) => m.MoviceModule) },

  { path: 'component', component: ComponentClockComponent },
  { path: 'advance', component: ComponentHandleComponent },
  { path: 'tabs', component: TabPanelComponent },
  { path: 'inputbox', component: InputboxComponent },
  { path: 'movice', loadChildren: () => import('./movice/movice.module').then((m) => m.MoviceModule) },

  { path: '**', redirectTo: 'movice', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
