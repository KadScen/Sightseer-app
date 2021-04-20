import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/performance";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyBWgtSxVtIuFTCs1jLdHnkzgX0UmXttpNc",
    authDomain: "sightseer-2f4cd.firebaseapp.com",
    databaseURL: "https://sightseer-2f4cd-default-rtdb.firebaseio.com",
    projectId: "sightseer-2f4cd",
    storageBucket: "sightseer-2f4cd.appspot.com",
    messagingSenderId: "983657816009",
    appId: "1:983657816009:web:c6c32ae833c6a67e9fd218",
    measurementId: "G-DCEBYH1H3X"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const perf = firebase.performance();
//Init firebase DB
export const db = firebase.firestore();
