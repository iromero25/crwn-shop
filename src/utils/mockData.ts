import { ICart, ICurrentUser, IItem } from "../components/types";
import { IUser } from "../redux/user/user.reducer";

const mockCurrentUser: ICurrentUser = {
  id: "abc",
  createdAt: new Date(),
  displayName: "Israel",
  email: "israel@gmail.com",
};

const currentCart: IItem = {
  id: 1,
  imageUrl: "someImageUrl",
  name: "Jacket",
  price: 45,
  quantity: 1,
};

export const mockUser: IUser = {
  checkingUserSession: false,
  currentUser: mockCurrentUser,
  error: null,
};

export const mockCart: ICart = {
  isCartHidden: false,
  cartItems: [currentCart],
};
