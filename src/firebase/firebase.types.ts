import firebase from "firebase/compat/app";

export type Transaction = firebase.firestore.Transaction;
export type DocumentData = firebase.firestore.DocumentData;

export type FirebaseUser = firebase.User | null;
export type SnapshopType = firebase.firestore.QuerySnapshot<DocumentData>;
export type DocumentRefType = firebase.firestore.DocumentReference<DocumentData>;
export type DocumentSnapshotType = firebase.firestore.DocumentSnapshot<DocumentData>;
