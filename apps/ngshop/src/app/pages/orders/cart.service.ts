import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Cart, CartItem } from "../components/models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.getCartItem());
  cartObservable$ = this.cart$.asObservable();

  initCartLocalStorage() {
    const initialCart = {
      items: []
    };
    const items = this.getCartItem();
    if (items.length === 0) {
      const initialJsonCart = JSON.stringify(initialCart);
      localStorage.setItem('items', initialJsonCart);
    } else {
      this.cart$.next(items);
    }

  }

  setCartItem(cartitem: CartItem, updateCart?: boolean): { result: string } {
    const cart: Cart = JSON.parse(localStorage.getItem('items')!);

    if (cart) {
      const idx = cart.items?.findIndex(item => item.productId === cartitem.productId);
      if (idx !== -1) {
        const { productId, quantity } = cart.items![idx!];
        if (updateCart) {
          cart.items![idx!].quantity = cartitem.quantity!;
        } else {
          // const newQuantity = quantity! + cartitem.quantity!;
          cart.items![idx!].quantity = cart.items![idx!].quantity! + cartitem.quantity!;
        }
        //  cart.items![idx!].quantity = newQuantity;
        localStorage.setItem('items', JSON.stringify(cart));
        this.cart$.next(cart.items);
        return { result: 'SUCCESS' };
      } else {
        cart.items?.push(cartitem);
        localStorage.setItem('items', JSON.stringify(cart));
        this.cart$.next(cart.items);
        return { result: 'SUCCESS' };
      }

    } else {
      const cartItem = JSON.stringify(cartitem);
      localStorage.setItem('items', cartItem);

      return { result: 'SUCCESS' };
    }

  }



  getCartItem(): CartItem[] {
    const tempcart: { items: CartItem[] } = JSON.parse(localStorage.getItem('items')!);
    const cart = tempcart.items;
    return cart ? cart : [];
    // return cart?.items! ?? [];
  }

  emptyCartItem() {
    const initialCart = {
      items: []
    };
    const initialJsonCart = JSON.stringify(initialCart);
    this.cart$.next([]);
    localStorage.setItem('items', initialJsonCart);
  }

  deleteCartItem(productid: number): { result: string } {
    const cartitems = this.getCartItem();
    const tempCart = cartitems.filter(item => item.productId !== productid);
    localStorage.clear();
    localStorage.setItem('items', JSON.stringify(tempCart));
    this.cart$.next(tempCart);
    return { result: 'SUCCESS' }
  }
}
