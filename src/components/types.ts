import firebase from "firebase/compat";

export type CurrentUser = firebase.firestore.DocumentData | null;

export interface IItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export interface ICart {
  isCartHidden: boolean;
  cartItems: IItem[];
}
export interface IShopData {
  id: number;
  title: string;
  routeName: string;
  items: IItem[];
}
