import firebaseAdmin, { ServiceAccount } from "firebase-admin";
//import serviceAccount from "./serviceAccountKey";
//const serviceAccount = require("../serviceAccountKey.json");

type DocumentData = firebaseAdmin.firestore.DocumentData;
type DocumentReferenceType = firebaseAdmin.firestore.DocumentReference<DocumentData>;

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/gm, "\n")
  : "";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    type: "service_account",
    project_id: "crwn-db-iromero",
    private_key_id: "2c0b3b71b8f9ed0713327598d8299f78a65c0287",
    private_key: PRIVATE_KEY,
    client_email: "firebase-adminsdk-61kos@crwn-db-iromero.iam.gserviceaccount.com",
    client_id: "110293061493625397417",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-61kos%40crwn-db-iromero.iam.gserviceaccount.com",
  } as ServiceAccount),
  //credential: firebaseAdmin.credential.cert(JSON.parse(serviceAccount)),
});

export const getFirebaseUserRef = (userId: string): DocumentReferenceType =>
  firebaseAdmin.firestore().doc(`users/${userId}`);
