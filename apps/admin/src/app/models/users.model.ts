
export interface IUser {
  id?: number;
  name?: string;
  password?: string;
  passwordHash?: string;
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
