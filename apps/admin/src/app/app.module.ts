import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { UiModule } from '@ngshop/ui';
import { ProductsModule } from '@ngshop/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './categories/category/alart-dialog/alert-dialog.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { FileuploadComponent } from './pages/products/fileupload/fileupload.component';
import { PrimengModule } from './primeng.module';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';
import { JwtInterceptor, UsersModule } from '@ngshop/users';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';



@NgModule({
  declarations: [AppComponent, ShellComponent,
    SidebarComponent, DashboardComponent,
    AlertDialogComponent,
    ProductFormComponent,
    ProductListComponent,
    FileuploadComponent,
    UserFormComponent,
    UserListComponent,
    OrderListComponent,
    OrderDetailComponent,
    CategoryComponent,
    CategoryFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UiModule,
    ProductsModule,
    PrimengModule,
    UsersModule,
    // CategoriesModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  exports: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
