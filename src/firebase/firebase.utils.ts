import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { Collection } from "../components/types";

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

type DocumentData = firebase.firestore.DocumentData;
export type FirebaseUser = firebase.User | null;
export type SnapshopType = firebase.firestore.QuerySnapshot<DocumentData>;
export type DocumentRefType = firebase.firestore.DocumentReference<DocumentData>;
export type DocumentSnapshotType = firebase.firestore.DocumentSnapshot<DocumentData>;

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
  return await batch.commit(); // batch.commit is an asynchronous operation
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
