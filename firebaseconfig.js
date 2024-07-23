// import firebase from 'firebase/app';
// import 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const messaging = firebase.messaging();

// export { messaging };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPzeRjvsIDEU7GBvfppMkwZXpFUtje5kw",
  authDomain: "culturays-bb060.firebaseapp.com",
  projectId: "culturays-bb060",
  storageBucket: "culturays-bb060.appspot.com",
  messagingSenderId: "260534629780",
  appId: "1:260534629780:web:bb42970b3c73e94706cb81",
  measurementId: "G-P51WG5SXDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);