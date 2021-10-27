import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
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

  // console.log(snapshot);
};

export default firebase;
