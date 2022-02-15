import firebaseAdmin from "firebase-admin";
import serviceAccount from "./serviceAccountKey";

type DocumentData = firebaseAdmin.firestore.DocumentData;
type DocumentReferenceType = firebaseAdmin.firestore.DocumentReference<DocumentData>;

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(serviceAccount)),
});

export const getFirebaseUserRef = (userId: string): DocumentReferenceType =>
  firebaseAdmin.firestore().doc(`users/${userId}`);
