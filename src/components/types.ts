import firebase from "firebase/compat";

export type CurrentUser = firebase.firestore.DocumentData | null;
export type Error = string | null;

export interface ICurrentUser {
  id: string;
  createdAt: Date;
  displayName: string;
  email: string;
}

export interface IItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export interface ICartHistory {
  [index: string]: {
    storedAt: Date;
    purchasedItems: IItem[];
  };
}

export interface ICartItemsCollection {
  currentCart: IItem[];
  cartHistory?: ICartHistory;
}

export interface ICart {
  isCartHidden: boolean;
  cartItems: IItem[];
  isFetching: boolean;
}

export interface IShopData {
  id: number;
  title: string;
  routeName: string;
  items: IItem[];
}

export type CollectionKeys = "hats" | "jackets" | "sneakers" | "mens" | "womens";

export type Collection = Record<CollectionKeys, IShopData>;

export interface IEmailAndPassword {
  email: string;
  password: string;
}

export interface ICredentials extends IEmailAndPassword {
  displayName: string;
}

export type GenericError = any & { message: string };
