// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJe3cAsOhOO5idOMZOMwBMjDjAlpvTZ4Y",
    authDomain: "crypto-wallet-with-metamask.firebaseapp.com",
    projectId: "crypto-wallet-with-metamask",
    storageBucket: "crypto-wallet-with-metamask.appspot.com",
    messagingSenderId: "212031999475",
    appId: "1:212031999475:web:c8c187e1677c73870cd686",
    measurementId: "G-EG0FMJR01Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);