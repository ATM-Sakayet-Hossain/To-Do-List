import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD0Av9-fb-JNYFQnbrkkeqUUALFhk1Qpg",
  authDomain: "todo-f01b8.firebaseapp.com",
  projectId: "todo-f01b8",
  storageBucket: "todo-f01b8.firebasestorage.app",
  messagingSenderId: "701284472651",
  appId: "1:701284472651:web:1427a1ff23c3e4ca74face"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize realtime database and get a reference to the service
export const database = getDatabase(app);
