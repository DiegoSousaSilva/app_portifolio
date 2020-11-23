import * as firebase from 'firebase';
import 'firebase/firebase-firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA451woqMSZ7jqU6jzTI33pZwEOGTrja2g",
    authDomain: "app-portifolio.firebaseapp.com",
    databaseURL: "https://app-portifolio.firebaseio.com",
    projectId: "app-portifolio",
    storageBucket: "app-portifolio.appspot.com",
    messagingSenderId: "915517376217",
    appId: "1:915517376217:web:e9ca5753f4cd392bf720c8",
    measurementId: "G-WT03768VJN"
  });

  const db = firebase.firestore();
  
  export {db};