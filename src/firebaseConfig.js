// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXKIVYABWUlR96qBdVK3FkfokphfKCkvU",
  authDomain: "desafio-uno-firebase.firebaseapp.com",
  projectId: "desafio-uno-firebase",
  storageBucket: "desafio-uno-firebase.appspot.com",
  messagingSenderId: "285775909668",
  appId: "1:285775909668:web:83211cf4a4b477c4be99b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app