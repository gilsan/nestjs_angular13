import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

import { ProductsModule } from '@ngshop/products';
import { PrimengModule } from './primeng.module';

import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './shared/nav/nav.component';
import { ProductSearchComponent } from './shared/product-search/product-search.component';
import { UiBannerComponent } from './pages/components/ui-banner/ui-banner.component';
import { CategoryBannerComponent } from './pages/components/category-banner/category-banner.component';
import { FeaturedBannerComponent } from './pages/components/featured-banner/featured-banner.component';
import { ProductItemComponent } from './pages/components/product-item/product-item.component';
import { ProductPageComponent } from './pages/components/product-page/product-page.component';
import { GalleryComponent } from './pages/components/gallery/gallery.component';
import { CardIconComponent } from './pages/components/card-icon/card-icon.component';
import { CartPageComponent } from './pages/components/cart-page/cart-page.component';
import { OrderSummaryComponent } from './pages/components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/components/checkout-page/checkout-page.component';
import { ThankyouComponent } from './pages/components/thankyou/thankyou.component';
import { UsersModule } from '@ngshop/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent, HomePageComponent,
    ProductListComponent, NavComponent, ProductSearchComponent, UiBannerComponent, CategoryBannerComponent, FeaturedBannerComponent, ProductItemComponent, ProductPageComponent, GalleryComponent,
    CardIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankyouComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    AppRoutingModule,
    ProductsModule,
    UsersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({})
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
