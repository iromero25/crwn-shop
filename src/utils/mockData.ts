import { IUser } from "../redux/user/user.reducer";
import { ICart, ICurrentUser, IItem } from "../components/types";

export const mockCurrentUser: ICurrentUser = {
  id: "abc",
  createdAt: new Date(),
  displayName: "Israel",
  email: "israel@gmail.com",
};

export const dummyItem: IItem = {
  id: 3,
  imageUrl: "someImageUrl",
  name: "Jacket",
  price: 45,
  quantity: 1,
};

export const currentCartDummy: IItem[] = [
  {
    id: 1,
    name: "Brown Brim",
    imageUrl: "/images/shop-img/hats/brown-brim.png",
    price: 25,
    quantity: 2,
  },
  {
    id: 2,
    name: "Blue Beanie",
    imageUrl: "/images/shop-img/hats/blue-beanie.png",
    price: 18,
    quantity: 1,
  },
];

export const mockUser: IUser = {
  checkingUserSession: false,
  currentUser: mockCurrentUser,
  error: null,
};

export const mockCart: ICart = {
  isCartHidden: false,
  cartItems: [dummyItem],
};
