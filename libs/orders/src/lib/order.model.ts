

export class Order {
  id?: string;
  orderItem?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  name?: string;
  items?: OrderItem[];
  city?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: number;
  user?: IUser;
  dateOrderedDate?: string;
  userid?: number;

}

export class OrderItem {
  id?: number;
  product?: number;
  quantity?: number;
  orderid?: number;
}


export interface IUser {
  id?: number;
  name?: string;
  password?: string;
  passwordHash?: string;
  email?: string;
  phone?: string;
  token?: string;
  isAdmin?: boolean;
  street?: string;
  apartment?: string;
  zip?: string;
  city?: string;
  country?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;

}
