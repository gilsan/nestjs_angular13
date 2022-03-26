export interface IUser {
  name: string;
  email: string;
  age: string;
  password?: string;
  passwordConfirm?: string;
  phoneNumber: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IClip {
  uid: string;
  displayName?: string;
  title: string;
  filename: string;
  url: string;
}
