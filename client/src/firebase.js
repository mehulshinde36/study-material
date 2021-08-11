import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDo_bImTHS5hK-nCygX2VbsTudpmME_EU8",
  authDomain: "study-material-e38ef.firebaseapp.com",
  projectId: "study-material-e38ef",
  storageBucket: "study-material-e38ef.appspot.com",
  messagingSenderId: "1041227289797",
  appId: "1:1041227289797:web:d318a8478acdebed848cac",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
