import firebase from "firebase";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBPs8v9kVw4Dys6byhkz9nxGVRe2jAR2rY",
    authDomain: "shazam-vin-6028c.firebaseapp.com",
    projectId: "shazam-vin-6028c",
    storageBucket: "shazam-vin-6028c.appspot.com",
    messagingSenderId: "564351428065",
    appId: "1:564351428065:web:e3a23eff245afc508cdea0",
    measurementId: "G-RJ7L1NEV6F"
  };

!firebase.apps.length ? firebase.initializeApp(firebaseConfig)  : firebase.app();



export default firebase;