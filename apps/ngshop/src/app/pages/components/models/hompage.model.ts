
export interface Product {
  id?: number;
  image: string;
  brand: string;
  price: number;
  rating: string | number;
  numReviews: string | null;
  isFeatured: boolean;
  name: string;
  description: string;
  category: string;
  countInStock: number;
  richDescription: string;
  dateCreated: string;
}
