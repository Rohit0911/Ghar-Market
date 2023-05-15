// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBD2895uV3bf6nlytTwTSxBfsNzL5gn_Dg",
  authDomain: "gharestate-dafe0.firebaseapp.com",
  projectId: "gharestate-dafe0",
  storageBucket: "gharestate-dafe0.appspot.com",
  messagingSenderId: "1069152753325",
  appId: "1:1069152753325:web:96cf1fd0ba34f2b80b5824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore();  
