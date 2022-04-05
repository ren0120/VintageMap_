import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "./config";
import "firebase/compat/auth";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
