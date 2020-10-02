import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../config";

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

export { auth };
