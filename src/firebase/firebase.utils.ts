import firebase from "firebase/compat/app";
import { runTransaction, doc } from "firebase/firestore";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { Collection, ICartItemsCollection, IItem } from "../components/types";

import { FirebaseUser } from "./firebase.types";
import { addItemToCart } from "../redux/cart/cart.utils";

const config = {
  apiKey: "AIzaSyCjflNtWx1LkoDxAfKLvzN5qBIpQUjGANo",
  authDomain: "crwn-db-iromero.firebaseapp.com",
  projectId: "crwn-db-iromero",
  storageBucket: "crwn-db-iromero.appspot.com",
  messagingSenderId: "259939150434",
  appId: "1:259939150434:web:32fe60875ec6ad552f3f3b",
  measurementId: "G-MLYCCRGF1T",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const createUserProfileDocument = async (
  userAuth: FirebaseUser,
  additionalData?: Record<string, any>
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error: any & { message: string }) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const getCartItemsCollection = async (
  userId: string
): Promise<ICartItemsCollection> => {
  const cartItemRef = firestore.doc(`cartItems/${userId}`);
  const snapshot = await cartItemRef.get();
  const cartItemCollection = snapshot.exists
    ? snapshot.data()
    : {
        currentCart: [],
      };
  return cartItemCollection as ICartItemsCollection;
};

/**
 * This  function adds the items received as parameter into the existing
 * cart in the database. In case we try adding an existing item, it adds
 * it up to the total. This is an example on how to modify the database
 * in an atomic fashion that includes reading and updating:
 * @param userId
 * @param items The items to be merged into the DB's current cart
 */
export const addItemsIntoDBCurrentCart = (userId: string, items: IItem[]) => {
  const cartItemsRef = firestore.collection("cartItems").doc(userId);

  return firestore.runTransaction(async transaction => {
    const snapshot = await transaction.get(cartItemsRef);

    if (!snapshot.exists) {
      transaction.set(cartItemsRef, { currentCart: items });
    } else {
      const currentCart: IItem[] = snapshot.exists
        ? snapshot.data()?.currentCart ?? []
        : [];
      const newCartItem = addItemToCart(items, currentCart);

      transaction.update(cartItemsRef, {
        currentCart: newCartItem,
      });
    }
  });
};

/**
 * Replace the DB's `cartItem` collection with the object passed
 * as parameter for the specified user
 * @param userId
 * @param itemCartCollection object to be used to update the collection at DB
 */
export const updateDBCart = async (
  userId: string,
  itemCartCollection: ICartItemsCollection
) => {
  const cartItemsRef = firestore.collection("cartItems").doc(userId);
  await cartItemsRef.update(itemCartCollection);
};

/**
 * I believe this was used to store the list of items in the DB.
 * Not used by the existing logic.
 * @param collectionKey
 * @param objectsToAdd
 */
export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: Collection
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  Object.values(objectsToAdd).forEach(({ title, items }) => {
    const newDocRef = collectionRef.doc(); // creates a doc id randomly
    const itemToStore = {
      title,
      items,
    };
    batch.set(newDocRef, itemToStore);
  });
  return await batch.commit(); // this is an asynchronous operation
};

export const convertCollectionSnapshotToMap = (
  collections: firebase.firestore.QuerySnapshot
) =>
  collections.docs.reduce((accumulator, doc) => {
    const { title, items } = doc.data();
    const lowerCaseTitle = title.toLowerCase();
    return {
      ...accumulator,
      [lowerCaseTitle]: {
        routeName: encodeURI(lowerCaseTitle),
        id: doc.id,
        title,
        items,
      },
    };
  }, {} as Collection);

export const getCurrentUser = (): Promise<FirebaseUser> =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });

export default firebase;

// Example on how to simulate throwing an asynchronous error:
// return new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("some error");
//   }, 1500);
// });
