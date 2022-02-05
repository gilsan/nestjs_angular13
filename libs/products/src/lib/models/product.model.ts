

export interface IProduct {
  id?: number;
  image?: string;
  brand?: string;
  price?: number;
  rating?: string | number;
  numReviews?: string | null;
  isFeatured?: boolean;
  name?: string;
  description?: string;
  category?: string;
  countInStock?: number;
  richDescription?: string;
  dateCreated?: string;
}

export interface IImage {
  id?: number;
  image: string;
  productid?: number;
}

export interface IReview {
  id?: number;
  avatar: string;
  name: string;
  review: string;
  productid?: number;
}

export interface IUser {
  id?: number;
  name?: string;
  password?: string;
  email: string;
  phone?: string;
  token?: string;
  isAdmin?: boolean;
  street?: string;
  apartment?: string;
  zip?: string;
  city?: string;
  country?: string;

}
