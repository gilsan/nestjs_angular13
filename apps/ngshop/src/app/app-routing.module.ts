import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "@ngshop/users";
import { AuthGuard } from "./auth.guard";
import { CartPageComponent } from "./pages/components/cart-page/cart-page.component";
import { CheckoutPageComponent } from "./pages/components/checkout-page/checkout-page.component";
import { ProductPageComponent } from "./pages/components/product-page/product-page.component";
import { ThankyouComponent } from "./pages/components/thankyou/thankyou.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";



const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'category/:categoryid', component: ProductListComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
  { path: 'success', component: ThankyouComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
