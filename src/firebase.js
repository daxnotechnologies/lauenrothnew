import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuzdU5DJInMY1ehIaN_yg7Jl0ERo6y9Vg",
  authDomain: "lauenroth-15969.firebaseapp.com",
  projectId: "lauenroth-15969",
  storageBucket: "lauenroth-15969.appspot.com",
  messagingSenderId: "1052918692928",
  appId: "1:1052918692928:web:cc4117f005e4859e3f73a5",
  measurementId: "G-CL9G1FDY1X"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
