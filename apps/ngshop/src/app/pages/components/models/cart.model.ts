

export interface Cart {
  items: CartItem[]
}

export interface CartItem {
  productId?: number;
  quantity?: number
}

export interface CartItemDetail {
  productId: string;
  quantity: number;
}

export interface CartProduct {
  id: number;
  image: string;
  price: number;
  name: string;
  quantity: number;
  totalprice: number;

}
