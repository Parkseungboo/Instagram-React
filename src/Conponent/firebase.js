// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnH96rsrwS51YMYq99VbJ0XeHvO5hVtbM",
  authDomain: "instargram-1df52.firebaseapp.com",
  projectId: "instargram-1df52",
  storageBucket: "instargram-1df52.appspot.com",
  messagingSenderId: "941381782696",
  appId: "1:941381782696:web:d087c00f17204f9064469d",
  measurementId: "G-4734W76C1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;