import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDlZ7mqfpRBxVM-eOqntxbBxnrjhdcp3Y",
  authDomain: "yts-data-289517.firebaseapp.com",
  databaseURL: "https://yts-data-289517.firebaseio.com",
  projectId: "yts-data-289517",
  storageBucket: "yts-data-289517.appspot.com",
  messagingSenderId: "129272377295",
  appId: "1:129272377295:web:b7a1e0990f518f53c9acba",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

export { auth };
