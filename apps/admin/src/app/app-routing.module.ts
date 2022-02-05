import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

import { CategoryFormComponent } from "./categories/category-form/category-form.component";
import { CategoryComponent } from "./categories/category/category.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { OrderDetailComponent } from "./pages/orders/order-detail/order-detail.component";
import { OrderListComponent } from "./pages/orders/order-list/order-list.component";
import { FileuploadComponent } from "./pages/products/fileupload/fileupload.component";
import { ProductFormComponent } from "./pages/products/product-form/product-form.component";
import { ProductListComponent } from "./pages/products/product-list/product-list.component";
import { UserFormComponent } from "./pages/users/user-form/user-form.component";
import { UserListComponent } from "./pages/users/user-list/user-list.component";
import { ShellComponent } from "./shared/shell/shell.component";


const routes: Routes = [
  {
    path: '', component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      // { path: 'categories', loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule) },
      { path: 'categories', component: CategoryComponent },
      { path: 'categories/form', component: CategoryFormComponent },
      { path: 'categories/form/:id', component: CategoryFormComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/form', component: ProductFormComponent },
      { path: 'products/form/:id', component: ProductFormComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/form', component: UserFormComponent },
      { path: 'users/form/:id', component: UserFormComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/form', component: OrderDetailComponent },
      { path: 'orders/form/:id', component: OrderDetailComponent },
      { path: 'fileupload', component: FileuploadComponent },
      // { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
