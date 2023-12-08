import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5zbXQ31owNRvmI97p0jMVQXM45sqlmF0",
  authDomain: "chatgpt-messenger-c534f.firebaseapp.com",
  projectId: "chatgpt-messenger-c534f",
  storageBucket: "chatgpt-messenger-c534f.appspot.com",
  messagingSenderId: "649363883729",
  appId: "1:649363883729:web:d9b271766504ab2e7de7f0",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
