// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBskCwjdlcrcx_43WE3PGKotxN6rrKBMG8",
    authDomain: "amozone-react.firebaseapp.com",
    projectId: "amozone-react",
    storageBucket: "amozone-react.appspot.com",
    messagingSenderId: "728952413054",
    appId: "1:728952413054:web:bafb7d932faddfcefe712f",
    measurementId: "G-B470W1GTSG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };